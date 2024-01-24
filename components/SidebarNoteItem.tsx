import SidebarNoteItemContent from '@/components/SidebarNoteItemContent';
import SidebarNoteItemHeader from "@/components/SidebarNoteItemHeader";

type Props = {
  noteId: string
  note: Record<string, string>
}

export default function SidebarNoteItem({ noteId, note}: Props) {

  const { title, content = '', updateTime } = note;
  return (
    <SidebarNoteItemContent
      id={noteId}
      title={note.title}
      expandedChildren={
        <p className="sidebar-note-excerpt">
          {content.substring(0, 20) || <i>(No content)</i>}
        </p>
      }>
      <SidebarNoteItemHeader title={title} updateTime={updateTime} />
    </SidebarNoteItemContent>
  );
}
