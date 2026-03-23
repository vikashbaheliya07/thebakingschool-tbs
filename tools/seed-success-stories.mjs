

const successStories = [
  {
    name: "Sarah Johnson",
    role: "Professional Baker & Bakery Owner",
    location: "New York, NY",
    graduationYear: "2022",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=400&q=80",
    quote: "The Baking School gave me the exact foundation I needed to launch my own bakery. The instructors were phenomenal, and the hands-on practice gave me the confidence to hire my own team.",
    achievement: "Opened successful bakery with 12 employees",
    course: "Professional Baking Certificate",
    rating: 5
  },
  {
    name: "Michael Chen",
    role: "Head Pastry Chef",
    location: "San Francisco, CA",
    graduationYear: "2021",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
    quote: "Translating classroom theory into high-pressure restaurant desserts was effortless. The French Patisserie Advanced course elevated my techniques to Michelin standards.",
    achievement: "Head Pastry Chef at Michelin-starred restaurant",
    course: "French Patisserie Advanced",
    rating: 5
  },
  {
    name: "Emily Rodriguez",
    role: "Wedding Cake Designer",
    location: "Los Angeles, CA",
    graduationYear: "2023",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80",
    quote: "Designing cakes requires immense precision. The skills I learned here helped me land contracts for celebrity weddings within my first year of graduating.",
    achievement: "Celebrity wedding cake designer",
    course: "Wedding Cake Design",
    rating: 5
  },
  {
    name: "David Thompson",
    role: "Restaurant Owner",
    location: "Chicago, IL",
    graduationYear: "2020",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    quote: "After taking the Chocolate & Confections course, we completely revamped our dessert menu. The feedback has been incredible and sales have skyrocketed.",
    achievement: "40% increase in dessert sales, multiple awards",
    course: "Chocolate & Confections",
    rating: 5
  },
  {
    name: "Lisa Park",
    role: "Artisan Baker",
    location: "Portland, OR",
    graduationYear: "2022",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    quote: "The Artisan Bread Specialist program taught me the true science of sourdough and yeast. Now I supply fresh loaves to over 15 local restaurants daily.",
    achievement: "Supplies 15 restaurants with artisan breads",
    course: "Artisan Bread Specialist",
    rating: 5
  },
  {
    name: "James Wilson",
    role: "YouTube Baking Instructor",
    location: "Austin, TX",
    graduationYear: "2021",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    quote: "This school gave me the technical expertise to not just bake, but to teach others how to bake confidently. My channel's growth is all thanks to my education.",
    achievement: "2M+ YouTube subscribers, online baking educator",
    course: "Professional Baking Certificate",
    rating: 5
  }
];

async function seed() {
  console.log("Starting seed process...");
  for (const story of successStories) {
    try {
      const res = await fetch('http://localhost:3000/api/success-stories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(story)
      });
      if (!res.ok) {
        console.error(`Failed to seed ${story.name}: ${res.statusText}`);
      } else {
        console.log(`Successfully seeded ${story.name}`);
      }
    } catch (err) {
      console.error(`Error for ${story.name}: ${err.message}`);
    }
  }
  console.log("Seed process finished.");
}

seed();
