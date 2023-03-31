import React from 'react'
import './SideBar.css'
const SideBar = ({onAddNote,notes,onDelateNote,activenote,setactivenote}) => {
  const sortedNote = notes.sort((a,b) =>b.modData - a.modData)
  return (
    <div className='app-sidebar'>
      <div className="app-sidebar-header">
        <h1>ノート</h1>
        <button onClick={onAddNote}>追加</button>
      </div>
      <div className="app-sudebar-notes">
        {sortedNote.map((note) =>(
        <div className={`app-sidebar-note ${note.id === activenote && 'active'}`} key={note.id} onClick={() =>setactivenote(note.id)}>
          <div className="sidebar-note-title">
            <strong>{note.title}</strong>
            <button onClick={() =>onDelateNote(note.id)}>削除</button>
            {/* このようにして対象を明らかにする*/}
          </div>
          <p>{note.content}</p>
          <small>{new Date(note.modData).toLocaleDateString('ja-JP',{hour:'2-digit',minute:'2-digit'})}</small>
        </div>
        ))}
      </div>
    </div>
  )
}
export default SideBar