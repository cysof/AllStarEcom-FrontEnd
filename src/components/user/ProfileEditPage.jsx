import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';
import api from '../../api';
import styles from './ProfileEditPage.module.css';

const ProfileEditPage = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    city: '',
    state: '',
    address: '',
    date_of_birth: '',
    profile_picture: null,
  });

  const [currentProfile, setCurrentProfile] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profilePicturePreview, setProfilePicturePreview] = useState('');

  const navigate = useNavigate();
  const { setIsAuthenticated, setUsername } = useContext(AuthContext);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/account/profile/');
      const userData = response.data;

      setCurrentProfile(userData);
      setFormData({
        first_name: userData.first_name || '',
        last_name: userData.last_name || '',
        phone: userData.phone || '',
        city: userData.city || '',
        state: userData.state || '',
        address: userData.address || '',
        date_of_birth: userData.date_of_birth || '',
        profile_picture: null,
      });

      if (userData.profile_picture_url) {
        setProfilePicturePreview(userData.profile_picture_url);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      toast.error('Failed to load profile data', {
        position: 'top-right',
        autoClose: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Profile picture must be less than 5MB', {
          position: 'top-right',
          autoClose: 3000,
        });
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select a valid image file', {
          position: 'top-right',
          autoClose: 3000,
        });
        return;
      }

      setFormData((prev) => ({ ...prev, profile_picture: file }));

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePicturePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePicture = async () => {
    try {
      await api.delete('/account/profile/delete-picture/');

      setProfilePicturePreview('');
      setFormData((prev) => ({ ...prev, profile_picture: null }));

      toast.success('Profile picture removed successfully', {
        position: 'top-right',
        autoClose: 3000,
      });
    } catch (error) {
      toast.error(
        error.response?.data?.error || 'Failed to remove profile picture',
        {
          position: 'top-right',
          autoClose: 3000,
        }
      );
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.first_name.trim()) {
      newErrors.first_name = 'First name is required';
    }

    if (!formData.last_name.trim()) {
      newErrors.last_name = 'Last name is required';
    }

    if (
      formData.phone &&
      !/^\+?1?\d{9,15}$/.test(formData.phone.replace(/\s/g, ''))
    ) {
      newErrors.phone =
        'Please enter a valid phone number with country code (e.g., +1234567890)';
    }

    if (formData.date_of_birth) {
      const birthDate = new Date(formData.date_of_birth);
      const today = new Date();
      if (birthDate > today) {
        newErrors.date_of_birth = 'Date of birth cannot be in the future';
      }
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error('Please fix the errors in the form', {
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const submitData = new FormData();

      // Append all form fields
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null && formData[key] !== '') {
          submitData.append(key, formData[key]);
        }
      });

      const response = await api.patch('/account/profile/update/', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Update auth context if username changed
      if (response.data.username) {
        setUsername(response.data.username);
      }

      toast.success('Profile updated successfully!', {
        position: 'top-right',
        autoClose: 3000,
      });

      // Navigate back to profile page after a short delay
      setTimeout(() => {
        navigate('/profile', { replace: true });
      }, 1500);
    } catch (error) {
      if (error.response?.data) {
        const errorData = error.response.data;
        const newErrors = {};

        Object.keys(errorData).forEach((key) => {
          if (Array.isArray(errorData[key])) {
            newErrors[key] = errorData[key][0];
          } else if (typeof errorData[key] === 'string') {
            newErrors[key] = errorData[key];
          }
        });

        setErrors(newErrors);

        if (errorData.detail) {
          toast.error(errorData.detail, {
            position: 'top-right',
            autoClose: 3000,
          });
        } else {
          toast.error('Failed to update profile. Please check the form.', {
            position: 'top-right',
            autoClose: 3000,
          });
        }
      } else if (error.message === 'Network Error') {
        toast.error('Network error. Please check your connection.', {
          position: 'top-right',
          autoClose: 3000,
        });
      } else {
        toast.error('Failed to update profile. Please try again.', {
          position: 'top-right',
          autoClose: 3000,
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/profile', { replace: true });
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
            <p>Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Edit Profile</h2>
        <p className={styles.subtitle}>Update your personal information</p>

        <form onSubmit={handleSubmit}>
          {/* Profile Picture Section */}
          <div className={styles.profilePictureSection}>
            <label className={styles.profilePictureLabel}>
              Profile Picture
            </label>
            <div className={styles.profilePictureContainer}>
              <div className={styles.previewContainer}>
                {profilePicturePreview ? (
                  <img
                    src={profilePicturePreview}
                    alt="Profile preview"
                    className={styles.profilePreview}
                  />
                ) : (
                  <div className={styles.placeholder}>
                    <span>No image</span>
                  </div>
                )}
              </div>

              <div className={styles.pictureControls}>
                <input
                  type="file"
                  id="profile_picture"
                  accept="image/*"
                  onChange={handleFileChange}
                  className={styles.fileInput}
                  disabled={isSubmitting}
                />
                <label htmlFor="profile_picture" className={styles.fileLabel}>
                  Choose Image
                </label>

                {profilePicturePreview && (
                  <button
                    type="button"
                    onClick={handleRemovePicture}
                    className={styles.removeButton}
                    disabled={isSubmitting}
                  >
                    Remove
                  </button>
                )}

                <small className={styles.fileHint}>
                  JPG, PNG, GIF up to 5MB
                </small>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Personal Information</h4>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="first_name" className="form-label">
                  First Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.first_name ? 'is-invalid' : ''
                  }`}
                  id="first_name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  placeholder="John"
                  disabled={isSubmitting}
                  autoComplete="given-name"
                />
                {errors.first_name && (
                  <div className="invalid-feedback">{errors.first_name}</div>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="last_name" className="form-label">
                  Last Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.last_name ? 'is-invalid' : ''
                  }`}
                  id="last_name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  placeholder="Doe"
                  disabled={isSubmitting}
                  autoComplete="family-name"
                />
                {errors.last_name && (
                  <div className="invalid-feedback">{errors.last_name}</div>
                )}
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="date_of_birth" className="form-label">
                Date of Birth
              </label>
              <input
                type="date"
                className={`form-control ${
                  errors.date_of_birth ? 'is-invalid' : ''
                }`}
                id="date_of_birth"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleChange}
                disabled={isSubmitting}
                autoComplete="bday"
              />
              {errors.date_of_birth && (
                <div className="invalid-feedback">{errors.date_of_birth}</div>
              )}
            </div>
          </div>

          {/* Contact Information */}
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Contact Information</h4>

            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Phone Number
              </label>
              <input
                type="tel"
                className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1234567890"
                disabled={isSubmitting}
                autoComplete="tel"
              />
              {errors.phone && (
                <div className="invalid-feedback">{errors.phone}</div>
              )}
              <small className="form-text text-muted">
                Include country code (e.g., +1 for US)
              </small>
            </div>

            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Street Address
              </label>
              <input
                type="text"
                className="form-control"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="123 Main Street"
                disabled={isSubmitting}
                autoComplete="street-address"
              />
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="city" className="form-label">
                  City
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="New York"
                  disabled={isSubmitting}
                  autoComplete="address-level2"
                />
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="state" className="form-label">
                  State/Province
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="NY"
                  disabled={isSubmitting}
                  autoComplete="address-level1"
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className={styles.actions}>
            <button
              type="button"
              onClick={handleCancel}
              className={styles.cancelButton}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileEditPage;
