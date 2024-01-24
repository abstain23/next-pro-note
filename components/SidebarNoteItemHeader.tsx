import dayjs from "dayjs";

type Props = {
  title: string;
  updateTime: string;
};
export default function SidebarNoteItemHeader({ title, updateTime }: Props) {
  return (
    <header className="sidebar-note-header">
      <strong>{title}</strong>
      <small>{dayjs(updateTime).format("YYYY-MM-DD hh:mm:ss")}</small>
    </header>
  );
}
