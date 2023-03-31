import { useContext, useEffect, useState } from 'react';
import './App.css';
import Main from './components/Main';
import SideBar from './components/SideBar';
import uuid from 'react-uuid'
import MyState from './components/MyState';
function App() {
  // const [notes,setnotes] =useState([])だと保存することができない。
  const [notes,setnotes] =useState(JSON.parse(localStorage.getItem('notes'))|| []);
  // keyを指定する。
  // ここではjSONをもとのオブジェクトに戻す必要がある

  const [activenote,setactivenote] =useState(false);
  // ここはfaulseがなくても動く。けどのちに使うから入れている。

  // ローカルストレージを更新する方法は、追加と削除のタイミング。
  // このように場面指定の更新はuseeffect
  useEffect(() =>{
    // localStorage.setItem('notes',notes)
    // 第二引数はオブジェクトになっているから、JSONの形式にしないとローカルストレージに保存できない
    localStorage.setItem('notes',JSON.stringify(notes));
  },[notes])
  useEffect(() =>{
    if(notes.length !==0){
      setactivenote(notes[0].id);
    }
  },[])
  const onAddNote = () =>{
    const newNote = {
      id:uuid(),
      title:'新しいノート',
      content:'新しいノートの内容です',
      modData:Date.now(),
    }
    setnotes([...notes,newNote])
    console.log(notes)
  }
  const onDelateNote = (id) =>{
    const fliterNote = notes.filter((note) =>note.id !==id);
    setnotes(fliterNote);
    // マッチしていない状況がtureの時
  }
  const getactiveNote = () =>{
    return notes.find((note) =>note.id ===activenote)
    // 条件に合うものを見つけて、それを取り出す
  }
  const onUpdataNote = (updateNote) =>{
    // 修正された新しいノートの配列を返す
    const updatedNoteArry = notes.map((note) =>{
      if(note.id === updateNote.id){
        return updateNote
      }
      else{
        return note
      }
    })
    setnotes(updatedNoteArry);
    // 変更される配列だけを変更してあげる。
    // だから、このようなデータを保持する系は軸となる、usestateが一つ存在する的な感じ。
  }
  return (
    <div className="App">
      <MyState>
      <SideBar onAddNote={onAddNote} notes={notes} onDelateNote={onDelateNote} activenote={activenote} setactivenote={setactivenote}/>
      <Main activenote={getactiveNote()} onUpdataNote={onUpdataNote}/>
      </MyState>
    </div>
  );
}
export default App;