export const studentGalleryImages = Array.from({ length: 36 }, (_, i) => {
  const id = i + 1
  const imageId = id.toString().padStart(3, "0")
  return {
    id,
    title: `Student Media ${imageId}`,
    category: "Student Work",
    image: `/gallery/BID${imageId}.jpg`, 
    description: 'Our talented students.',
  }
})
