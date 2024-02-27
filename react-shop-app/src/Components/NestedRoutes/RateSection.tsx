import { Button } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import StarRating from "../StarRating";
import "../../style/Comments.css";
import {
  collection,
  query,
  getDocs,
  serverTimestamp,
  addDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";

function RateSection() {
  const [inputValue, setInputValue] = useState("");
  const [reviews, setReviews] = useState<Array<{}>>([]);
  const { email } = useContext(AuthContext);
  const params = useParams();
  const itemId = params.id;

  //RETRIEVE DATA FROM DATABASE
  const getItemReviews = async () => {
    if (itemId) {
      const reviewsRef = collection(db, "items", itemId, "reviews");
      const reviewsForItemQuery = query(reviewsRef);
      const querySnapshot = await getDocs(reviewsForItemQuery);
      const filteredQuery = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setReviews(filteredQuery);
    }
  };
  useEffect(() => {
    getItemReviews();
  }, []);

  //ADD REVIEWS TO DATA BASE
  const handleSubmit = async () => {
    if (email && itemId) {
      try {
        await addDoc(collection(db, "items", itemId, "reviews"), {
          userName: email,
          itemReview: inputValue,
          timestamp: serverTimestamp(),
        });
        getItemReviews();
        console.log("Document written with ID: ", email);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };

  //DELETE REVIEW
  const navigate = useNavigate();
  const deleteReview = async (reviewId) => {
    console.log("username :>> ", reviewId);
    if (itemId) {
      const reviewsRef = doc(db, "items", itemId, "reviews", reviewId);

      await deleteDoc(reviewsRef);
      navigate(0);
    }
  };

  return (
    <>
      {reviews.map((review) => {
        return (
          <div
            key={review.id}
            className="d-flex m-5 mt-0 mb-3 comment-bg rounded p-1"
          >
            <div className="flex-shrink-0">
              <RxAvatar size={40} />
            </div>
            <div className="flex-grow-1 ms-3">
              <h5>
                {review.userName}
                <small className="text-muted">
                  {/* <i>{review.timestamp}</i> */}
                </small>
              </h5>
              <p>{review.itemReview}</p>
            </div>
            <Button
              onClick={() => deleteReview(review.id)}
              className="my-auto mt-0 btn btn-link bg-transparent text-secondary text-decoration-none"
              title="Delete"
            >
              X
            </Button>
          </div>
        );
      })}
      <StarRating />
      <FloatingLabel
        className="w-50 m-5 mt-0"
        controlId="floatingTextarea2"
        label="Comment here..."
      >
        <Form.Control
          className="bg-light"
          as="textarea"
          placeholder="Leave a comment here"
          style={{ height: "100px" }}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button onClick={handleSubmit} className="mt-1" variant="dark">
          Submit
        </Button>
      </FloatingLabel>
    </>
  );
}

export default RateSection;
