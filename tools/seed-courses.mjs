const courses = [
  {
    title: "Fundamental Baker Course",
    description:
      "Learn the basics of baking, different types of cakes, and dry cakes. Perfect for beginners who want a strong foundation. 100% VEGAN — we don’t even use eggs in anything.",
    duration: "1 month",
    students: "12",
    rating: "4.9",
    price: "₹24,999",
    image: "/course1.webp",
    level: "Beginner",
    lessons: 16,
    certificate: true,
  },
  {
    title: "Intermediate Baker Course",
    description:
      "Includes everything from the Fundamental Course plus a variety of chocolates, advanced cake designing, cookies, brownies, and laminated dough. 100% VEGAN — we don’t even use eggs in anything.",
    duration: "2 months",
    students: "10",
    rating: "4.9",
    price: "₹39,999",
    image: "/course2.webp",
    level: "Intermediate",
    lessons: 24,
    certificate: true,
  },
  {
    title: "Professional Baker Course",
    description:
      "Covers everything from the Fundamental and Intermediate Courses plus two-tier cakes, nutritional baking, fondant cakes, bread baking, and doughnuts. 100% VEGAN — we don’t even use eggs in anything.",
    duration: "3 months",
    students: "10",
    rating: "5.0",
    price: "₹54,999",
    image: "/course3.webp",
    level: "Advanced",
    lessons: 32,
    certificate: true,
  },
  {
    title: "Advanced Baker Course",
    description:
      "Covers the Fundamental, Intermediate, and Professional Courses plus buttercream, cheesecakes, advanced dry cakes, tarts & pies, and advanced breads. 100% VEGAN — we don’t even use eggs in anything.",
    duration: "4 months",
    students: "8",
    rating: "5.0",
    price: "₹69,999",
    image: "/1.webp",
    level: "Professional",
    lessons: 40,
    certificate: true,
  },
  {
    title: "Expert Baker Course",
    description:
      "Includes everything from the Fundamental to Advanced Courses plus viennoiseries, shakes, mocktails, barista skills, ice cream, wraps, advanced cookies, pasta, and macarons. 100% VEGAN — we don’t even use eggs in anything.",
    duration: "5 months",
    students: "6",
    rating: "5.0",
    price: "₹84,999",
    image: "/2.webp",
    level: "Expert",
    lessons: 48,
    certificate: true,
  },
  {
    title: "Master Baker Course",
    description:
      "Includes everything from the Fundamental to Expert Courses plus industrial tours, industrial training, internship opportunities, and business mentorship. 100% VEGAN — we don’t even use eggs in anything.",
    duration: "6 months",
    students: "6",
    rating: "5.0",
    price: "₹99,999",
    image: "/3.webp",
    level: "Master",
    lessons: 60,
    certificate: true,
  },
];

async function seed() {
  console.log("Starting Courses seed process...");
  for (const course of courses) {
    try {
      const res = await fetch('http://localhost:3000/api/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(course)
      });
      if (!res.ok) {
        console.error(`Failed to seed ${course.title}: ${res.statusText}`);
      } else {
        console.log(`Successfully seeded ${course.title}`);
      }
    } catch (err) {
      console.error(`Error for ${course.title}: ${err.message}`);
    }
  }
  console.log("Seed process finished.");
}

seed();
