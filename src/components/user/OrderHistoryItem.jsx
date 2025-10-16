import React from 'react'
import styles from './OrderHistoryItem.module.css';

const OrderHistoryItem = () => {
  return (
    <div className=' card-body'>
        <div className= {`order-item mb-3 ${styles.orderItem}`}>
            <div className='row'>
                <div className='col-md-2'>
                    <img 
                    src="accset/laptop.jpg" 
                    alt=""
                    className='img-fluid'
                    style={{borderRadius: '5px'}}
                     />
                     <div>
                        <div className='col'>
                            <h6>Product Nmae</h6>
                            <p>Order Date: </p>
                            <P>Order ID:</P>

                        </div>
                        <div className='col-md-2 text-center'>
                            <h6 className='text-muted'>Quantity: 1</h6>
                        </div>
                        <div className='col-md-2 text-center'>
                            <h6 className='text-muted'>$100.00</h6>
                        </div>
                     </div>

                </div>

            </div>

        </div>

    </div>
  )
}

export default OrderHistoryItem