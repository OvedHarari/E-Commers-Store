import { FunctionComponent, useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SiteTheme } from "../App";
import { getProductById } from "../services/productsService";
import { addToCart } from "../services/cartService";
import { successMsg } from "../services/feedbacksService";
import Product from "../interfaces/Product";
// import ReactImageMagnify from 'react-image-magnify'


interface ProductPageProps {
    allProducts: any;
    setAllProducts: Function;
    userInfo: any;

}

// const images = [
//     '../images/img1.jpg',
//     '../images/img2.jpg',
//     '../images/img3.jpg',
//     '../images/img4.jpg',
//     '../images/img5.jpg',
// ];

const ProductPage: FunctionComponent<ProductPageProps> = ({ allProducts, setAllProducts, userInfo }) => {
    let navigate = useNavigate();
    let { productId } = useParams();
    let [product, setProduct] = useState<Product>()
    let theme = useContext(SiteTheme);

    //************

    // const [img, setImg] = useState(images[0]);
    // const hoverHandler = (image, i) => {
    //     setImg(image);
    //     refs.current[i].classList.add('active');
    //     for (var j = 0; j < images.length; j++) {
    //         if (i !== j) {
    //             refs.current[j].classList.remove('active');
    //         }
    //     }
    // };
    // const refs = useRef([]);
    // refs.current = [];
    // const addRefs = (el) => {
    //     if (el && !refs.current.includes(el)) {
    //         refs.current.push(el);
    //     }
    // };




    useEffect(() => {
        if (productId) {
            getProductById(productId)
                .then((res) => {
                    setProduct(res.data)

                })

                .catch((err) => { console.log(err); }
                );
        }
    }, [setAllProducts, productId])

    let handleAddToCart = (product: Product) => {
        addToCart(product)
            .then((res) => successMsg(` ${product.title} added to cart`))
            .catch((err) => console.log(err))
    }
    return (<>
        {product && (
            <div className="container productContent">
                <div className="row ">
                    <div className="col d-flex justify-content-start ">
                        <img className="productImg" src={`${product.thumbnail}`} alt={`${product.title}`} style={{ width: "20rem", height: "20rem" }} />
                    </div>
                    <div className="col productInfo text-start" style={{ height: "28rem" }}>
                        <h2>{`${product.title}`}</h2>
                        <div className="productDescription container-full ">
                            <h6 className="productDescTitle mt-5">Description:</h6>
                            <p >{`${product.description}`} </p>


                        </div>
                        <h5 className="mt-5 ">Price: {`${product.price}`} &#8362;</h5>

                        {userInfo.email && <button className="btn" onClick={() => handleAddToCart(product!)}>Add To Cart</button>}
                        {userInfo.isAdmin && <button className="btn" disabled>Add To Cart</button>}
                    </div>
                    <div className="productDescription">
                        {/* <div className="container">
                            <div className="left">
                                <div className="left_1">
                                    {images.map((image, i) => (
                                        <div
                                            className={i == 0 ? 'img_wrap active' : 'img_wrap'}
                                            key={i}
                                            onMouseOver={() => hoverHandler(image, i)}
                                            ref={addRefs}
                                        >
                                            <img src={image} alt="" />
                                        </div>
                                    ))}
                                </div>
                                <div className="left_2">
                                    <ReactImageMagnify
                                        {...{
                                            smallImage: {
                                                alt: 'Wristwatch by Ted Baker London',
                                                isFluidWidth: true,
                                                src: watchImg300
                                            },
                                            largeImage: {
                                                src: watchImg1200,
                                                width: 1200,
                                                height: 1800
                                            },
                                            enlargedImageContainerDimensions: {
                                                width: '150%',
                                                height: '150%',
                                            },
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="right"></div>
                        </div> */}

                    </div>
                </div>
            </div>
        )}
        <div className="d-flex justify-content-end backBtn">
            <button className="btn btn-outline-info" onClick={() => navigate(-1)}>Back</button>
        </div>
    </>);
}

export default ProductPage;