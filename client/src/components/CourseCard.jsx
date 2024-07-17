import { Card } from "@/components/ui/card";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

export default function CourseCard({ course }) {
  const navigate = useNavigate();
  const { title, description, category, numbersOfLectures, thumbnail, _id } =
    course;

    const handleCardClick = () => {
      navigate(`/courses/description` , {state:course});
    };

  return (
    <div onClick={handleCardClick} className="card card-compact bg-base-100 w-96 shadow-xl cursor-pointer ">
      <figure>
        <img
          src={thumbnail?.secure_url}
          className="w-[900px] h-[200px] p-2 rounded-xl"
          alt="Course Image"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-yellow-500 font-semibold "> {title} </h2>
        <p>{description}</p>
        <p>
          {" "}
          <span className="text-yellow-500 font-semibold">Lectures:</span>{" "}
          {numbersOfLectures}
        </p>
        <div>
          <div className="card-actions items-center justify-between">
            <Button className="bg-[#0077b6] text-white hover:bg-[#005a8d] focus:outline-none focus:ring-2 focus:ring-[#0077b6] focus:ring-offset-2">
              Buy Now
            </Button>
            <div className="badge badge-outline">{category}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
