import { getAllNotes } from "@/lib/redis";
import { sleep } from "@/lib/utils";
import SidebarNoteListFilter from "@/components/SidebarNoteListFilter";
import SidebarNoteItemHeader from "@/components/SidebarNoteItemHeader";

export default async function NoteList() {
  await sleep(1000);
  const notes = await getAllNotes();
  const arr = Object.entries(notes);
  if (arr.length == 0) {
    return <div className="notes-empty">{"No notes created yet!"}</div>;
  }

  return (
    <SidebarNoteListFilter
      notes={arr.map(([noteId, note]) => {
        const noteData = JSON.parse(note);
        return {
          noteId,
          note: noteData,
          header: (
            <SidebarNoteItemHeader
              title={noteData.title}
              updateTime={noteData.updateTime}
            />
          ),
        };
      })}
    ></SidebarNoteListFilter>
  );
}
