import React from 'react'
import './Main.css'
import {ReactMarkdown} from 'react-markdown/lib/react-markdown'
const Main = ({activenote,onUpdataNote}) => {
  const onEditNote = (key,value) =>{
    onUpdataNote({
      // id:activenote.id,ではない。これだと新しく作成される的な感じになってしまう。スプレッドにすることで、既存を展開して、変更部分だけを変える的な感じになる。
      ...activenote,
      [key]:value,
      modData:Date.now(),
    })
// ここで、新しい配列として作成指定しているのは、既存の配列はデータを保管する用であって、編集の作業とかもそれで行うのは良くない。編集とかのできる配列を用意して、それをデータ用の配列に入れる
  }
  if(!activenote){
    return <div className='no-active-note'>ノートが選択されていません</div>
  }
  return (
    <div className='app-main'>
      <div className='app-main-note-edit'>
        <input id='title'type="text" value={activenote.title} onChange={(e) =>onEditNote('title',e.target.value)}/>
        <textarea id="content" placeholder='ノート内容を記入' value={activenote.content} onChange={(e) =>onEditNote('content',e.target.value)}>
        </textarea>
        {/* nameのかのこと。e.targetとか */}
      </div>
      <div className='app-main-note-preview'>
        <h1 className='preview-title'>
          {activenote.title}
        </h1>
        <ReactMarkdown className='markdown-preview'>
          {activenote.content}
        </ReactMarkdown>
      </div>
    </div>
  )
}
export default Main



// ローカルストレージについて、他の講座でやったことをやる
