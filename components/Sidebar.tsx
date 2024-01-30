import React, { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { getAllNotes } from "@/lib/redis";
import SidebarNoteList from "@/components/SidebarNoteList";
import EditButton from "@/components/EditButton";
import NoteListSkeleton from "@/components/NoteListSkeleton";
import SidebarSearchField from "@/components/SidebarSearchField";
import SidebarImport from '@/components/SidebarImport';

export default async function Sidebar() {
  return (
    <>
      <section className="col sidebar">
        <Link href="/" className="link--unstyled">
          <section className="sidebar-header">
            <Image
              className="logo"
              src="/logo.svg"
              width={22}
              height={20}
              alt=""
              role="presentation"
            />
            <strong>React Notes</strong>
          </section>
        </Link>
        <section className="sidebar-menu" role="menubar">
          <SidebarSearchField />
          <EditButton noteId={null}>New</EditButton>
        </section>
        <nav>
          {/*// 客户端组件下移*/}
          {/*// 最佳实践：使用 Suspense 组件包裹异步组件，以便在异步组件加载完成之前显示一个 loading 状态。*/}
          <Suspense fallback={<NoteListSkeleton />}>
            <SidebarNoteList />
          </Suspense>
        </nav>
        <SidebarImport />
      </section>
    </>
  );
}
