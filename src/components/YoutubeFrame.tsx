"use client"

import React from "react"

interface YouTubeEmbedProps {
  videoId?: string
  autoplay?: boolean
}

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({
  videoId = "dQw4w9WgXcQ", // default preset
  autoplay = false,
}) => {
  const autoplayParam = autoplay ? 1 : 0

  return (
    <div className="w-full px-6 md:px-20 lg:px-40 py-6">
      <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-lg">
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=${autoplayParam}&modestbranding=1&rel=0&showinfo=0`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  )
}

export default YouTubeEmbed
