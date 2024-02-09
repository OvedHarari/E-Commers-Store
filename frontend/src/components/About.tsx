import { FunctionComponent } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

interface AboutProps {
    setOpenContactModal: Function;

}

const About: FunctionComponent<AboutProps> = ({ setOpenContactModal }) => {
    return (
        <>
            <Container className="my-5">
                <Row>
                    <h2 className="mb-5">Welcome to All-In - Your Ultimate Shopping Destination!</h2>
                    <hr />
                    <Col md={8}>
                        <div className="text-start mt-5">
                            <p>
                                At "All-In," we are dedicated to delivering an unparalleled shopping experience that goes beyond the ordinary. Immerse yourself in our expansive selection of top-notch products, spanning from cutting-edge smartphones and state-of-the-art laptops to luxurious fragrances, captivating home decorations, and trendsetting clothing for both men and women.
                            </p>
                            <p>
                                Our mission is rooted in the commitment to bring you the very best in quality, innovation, and style. Whether you're a tech enthusiast, a fashion trailblazer, or someone with a keen eye for home decor, "All-In" has something truly special for everyone.
                            </p>
                            <p>
                                Take a leisurely stroll through our intuitively designed website, and unlock a realm of possibilities. We take immense pride in meticulously curating a diverse and extensive collection of products to cater to the distinctive tastes and preferences of our diverse clientele.
                            </p>
                            <p>
                                "All-In" isn't just a store; it's an experience tailored to your lifestyle. From the latest tech gadgets that redefine innovation to fashion statements that turn heads, and home decor that transforms spaces, we strive to be the one-stop destination for all your desires.
                            </p>

                        </div>
                    </Col>
                    <Col md={4}>
                        <Card className="mb-5 mt-4 ">

                            <Card.Body onClick={() => setOpenContactModal(true)}>
                                <h5>Contact Us</h5>
                                <p>If you have any questions or need assistance, feel free to reach out to our friendly customer support team. We're here to help!</p>
                                {/* Add your contact information or a contact button/link here */}
                            </Card.Body>

                        </Card>
                        <Card>
                            <Card.Body>
                                <h5>Why Choose Us?</h5>
                                <ul className="text-start">
                                    <li>Wide Range of Products</li>
                                    <li>Quality Assurance</li>
                                    <li>Secure Payment Options</li>
                                    <li>Fast and Reliable Shipping</li>
                                    {/* Add more reasons based on your store's unique selling points */}
                                </ul>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>


        </>);
}

export default About;