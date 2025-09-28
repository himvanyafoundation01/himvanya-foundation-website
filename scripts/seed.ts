// import { connectToDatabase } from "@/lib/mongodb";
// import { HomePageContentModel } from "@/lib/home/home";
// import { aboutModel } from "@/lib/about/about";
// import { ContactPageModel } from "@/lib/contact/contact";
// import Work from "@/lib/our-work/work";
// import { galleryModel } from "@/lib/gallery/gallery";
// import { Blog } from "@/lib/blog/blog";
// import { seedData } from "@/lib/home/seed";
// import { aboutSeedData } from "@/lib/about/seed";
// import { seedContact } from "@/lib/contact/seed";
// import { workSeed } from "@/lib/our-work/seed";
// import { gallerySeed } from "@/lib/gallery/seed";
// import BlogSeed from "@/lib/blog/seed";
// import { BlogPost } from "@/lib/blog/blogpost/blogpost";


// export async function Main() {
//     console.log("seeding data")
//     await connectToDatabase();
//     console.log("connected to database")
//     await HomePageContentModel.create(seedData)
//     console.log("seeded home page")
//     await aboutModel.create(aboutSeedData)
//     console.log("seeded about page")
//     await seedContact()
//     console.log("seeded contact page")
//     await Work.create(workSeed)
//     console.log("seeded work page")
//     await galleryModel.create(gallerySeed)
//     console.log("gallery seeded")
//     await Blog.create(BlogSeed)

//     await BlogPost.create(BlogSeed.blogPosts)
// }