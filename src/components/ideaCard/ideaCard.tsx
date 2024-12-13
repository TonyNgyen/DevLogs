import React from 'react'

interface Note {
    content: string;
    dateCreated: Date;
    importance: number;
    subnotes: Note[];
}

interface Idea {
    name: string;
    dateCreated: Date;
    color?: string;
    notes: (Note | null)[];
}

function IdeaCard() {
  return (
    <div>IdeaCard</div>
  )
}

export default IdeaCard