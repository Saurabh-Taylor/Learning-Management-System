import { Button } from "@/components/ui/button";
import HomeLayout from "@/Layouts/HomeLayout";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";

const CourseDescription = () => {
  const { state } = useLocation();
  const { category, description, numbersOfLectures, title, thumbnail } = state;
  const { role, data } = useSelector((store) => store?.auth);


  return (
    <HomeLayout>
      <div className="pt-12 px-20  text-white flex flex-col justify-center items-center gap-10  min-h-[90vh] bg-[#1b263b] ">
        <div className="w-full">
          <section className="w-full py-12 md:py-24 lg:py-32 bg-primary">
            <div className="container grid gap-6 px-4 md:px-6 lg:grid-cols-2 lg:items-center">
              <div className="space-y-4">
                <h1 className="text-3xl text-yellow-500 font-bold tracking-tighter text-primary-foreground sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                  {title || "Introduction to Web Development"}
                </h1>
                <p className="max-w-[700px] text-primary-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {description ||
                    "Learn the fundamentals of web development, including HTML, CSS, and JavaScript, and build your first web application."}
                </p>
                {role === "ADMIN" ||
                data?.subscription?.status === "ACTIVE" ? (
                  <Button className="bg-[#0077b6] text-white hover:bg-[#005a8d] focus:outline-none focus:ring-2 focus:ring-[#0077b6] focus:ring-offset-2">
                    Watch Lectures
                  </Button>
                ) : (
                  <Button className="bg-[#0077b6] text-white hover:bg-[#005a8d] focus:outline-none focus:ring-2 focus:ring-[#0077b6] focus:ring-offset-2">
                    Subscribe
                  </Button>
                )}
              </div>
              <img
                src={thumbnail?.secure_url || "/placeholder.svg"}
                width={600}
                height={400}
                alt="Course Thumbnail"
                className="rounded-lg object-cover w-full aspect-[3/2]"
              />
            </div>
          </section>
          <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container grid gap-6 px-4 md:px-6 lg:grid-cols-3 lg:gap-12">
              <div className="grid gap-2">
                <h2 className="text-xl text-yellow-500 font-bold">Category</h2>
                <p className="text-muted-foreground">
                  {category || "Web Development"}
                </p>
              </div>
              <div className="grid gap-2">
                <h2 className="text-xl text-yellow-500 font-bold">Lectures</h2>
                <p className="text-muted-foreground">
                  {numbersOfLectures || 0}
                </p>
              </div>
              <div className="grid gap-2">
                <h2 className="text-xl font-bold">Duration</h2>
                <p className="text-muted-foreground">4 weeks</p>
              </div>
            </div>
          </section>
          <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container grid gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <h2 className="text-2xl text-yellow-500 font-bold">
                  Course Description
                </h2>
                <p className="text-muted-foreground">
                  {description ||
                    "In this course, you will learn the fundamentals of web development, including HTML, CSS, and JavaScript.You will build your first web application from scratch, learning how to create a responsive and interactive user interface."}
                </p>
                <p className="text-muted-foreground">
                  The course is divided into four weeks, with each week focusing
                  on a different aspect of web development. You will start by
                  learning the basics of HTML and CSS, and then move on to more
                  advanced topics such as JavaScript, responsive design, and web
                  frameworks.
                </p>
                <p className="text-muted-foreground">
                  By the end of the course, you will have a solid understanding
                  of web development and be able to build your own web
                  applications.
                </p>
              </div>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <h3 className="text-xl font-bold">What You'll Learn</h3>
                  <ul className="list-disc pl-6 text-muted-foreground">
                    <li>HTML and CSS fundamentals</li>
                    <li>JavaScript and interactivity</li>
                    <li>Responsive web design</li>
                    <li>Web frameworks and libraries</li>
                  </ul>
                </div>
                <div className="grid gap-2">
                  <h3 className="text-xl font-bold">Prerequisites</h3>
                  <ul className="list-disc pl-6 text-muted-foreground">
                    <li>Basic computer skills</li>
                    <li>No prior coding experience required</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </HomeLayout>
  );
};

export default CourseDescription;
