const RB=ReactBootstrap;
const {Alert, Card, Button, Table} = ReactBootstrap;

const firebaseConfig = {
  apiKey: "AIzaSyANfihaTA8bMNLGPUVrJfhXvhouKU3E50Y",
  authDomain: "web-2566-6e6e9.firebaseapp.com",
  projectId: "web-2566-6e6e9",
  storageBucket: "web-2566-6e6e9.appspot.com",
  messagingSenderId: "41940770193",
  appId: "1:41940770193:web:99aee9e63d19570ba1ce30",
  measurementId: "G-DZ28R46YL1"
};

firebase.initializeApp(firebaseConfig);      
const db = firebase.firestore();
db.collection("students").get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
      console.log(`${doc.id} =>`,doc.data());
  });
});

class App extends React.Component {
    title = (
      <Alert variant="danger">
        <b>Work6 :</b> Firebase
      </Alert>
    );
    footer = (
      <div>
        By 653380104-0 พัชรพงษ์ พูนทรัพย์อมร <br />
        College of Computing, Khon Kaen University
      </div>
    );
    state = {
        scene: 0,
        students:[],
        stdid:"",
        stdtitle:"",
        stdfname:"",
        stdlname:"",
        stdemail:"",
        stdphone:"",
    }      
    render() {
        // var stext = JSON.stringify(this.state.students);  
        return (
          <Card>
            <Card.Header>{this.title}</Card.Header>  
            <Card.Body>
              <Button
                    className = "btn-danger text-light m-1"
                    onClick={()=>this.readData()}>Read Data</Button>
              <Button 
                    className = "btn-danger text-light m-1"
                    onClick={()=>this.autoRead()}>Auto Read</Button>
              <div>
              <StudentTable data={this.state.students} app={this}/>  
              </div>
            </Card.Body>
            <Card.Footer>
            <b>เพิ่ม/แก้ไขข้อมูล นักศึกษา :</b><br/>
            <TextInput label="ID" app={this} value="stdid" style={{width:120,margin:2}}/>  
            <TextInput label="คำนำหน้า" app={this} value="stdtitle" style={{width:100,margin:2}} />
            <TextInput label="ชื่อ" app={this} value="stdfname" style={{width:120,margin:2}}/>
            <TextInput label="สกุล" app={this} value="stdlname" style={{width:120,margin:2}}/>
            <TextInput label="Email" app={this} value="stdemail" style={{width:150,margin:2}} />        
            <TextInput label="Phone" app={this} value="stdphone" style={{width:120,margin:2}}/>
            <Button 
                  className = "btn-danger text-white m-1"
                  onClick={()=>this.insertData()}>Save</Button>
            </Card.Footer>
            <Card.Footer>{this.footer}</Card.Footer>
          </Card>          
        );
      }  
    readData(){
        db.collection("students").get().then((querySnapshot) => {
            var stdlist=[];
            querySnapshot.forEach((doc) => {
                stdlist.push({id:doc.id,... doc.data()});                
            });
            console.log(stdlist);
            this.setState({students: stdlist});
        });
    } 
    autoRead(){
        db.collection("students").onSnapshot((querySnapshot) => {
            var stdlist=[];
            querySnapshot.forEach((doc) => {
                stdlist.push({id:doc.id,... doc.data()});                
            });          
            this.setState({students: stdlist});
        });
    }
    insertData(){
        db.collection("students").doc(this.state.stdid).set({
           title : this.state.stdtitle,
           fname : this.state.stdfname,
           lname : this.state.stdlname,
           phone : this.state.stdphone,
           email : this.state.stdemail,
        });
    }
    edit(std){      
        this.setState({
         stdid    : std.id,
         stdtitle : std.title,
         stdfname : std.fname,
         stdlname : std.lname,
         stdemail : std.email,
         stdphone : std.phone,
        })
     }
     delete(std){
        if(confirm("ต้องการลบข้อมูล")){
           db.collection("students").doc(std.id).delete();
        }
       }

  }
  function StudentTable({data, app}){
    return <table className='table'>
    <tr>
        <td>รหัส</td>
        <td>คำนำหน้า</td>
        <td>ชื่อ</td>
        <td>สกุล</td>
        <td>email</td>
        </tr>
        {
          data.map((s)=><tr>
          <td>{s.id}</td>
          <td>{s.title}</td>
          <td>{s.fname}</td>
          <td>{s.lname}</td>
          <td>{s.email}</td>
          <td><EditButton std={s} app={app}/></td>
          <td><DeleteButton std={s} app={app}/></td>        
          </tr> )
        }
    </table>
  }


  function TextInput({label,app,value,style}){
    return <label className="form-label">
    {label}:    
     <input className="form-control" style={style}
     value={app.state[value]} onChange={(ev)=>{
         var s={};
         s[value]=ev.target.value;
         app.setState(s)}
     }></input>
   </label>;  
  }
  function EditButton({std,app}){
    return <button onClick={()=>app.edit(std)}>แก้ไข</button>
   }
   function DeleteButton({std,app}){    
    return <button onClick={()=>app.delete(std)}>ลบ</button>
  }




  const container = document.getElementById("myapp");
  const root = ReactDOM.createRoot(container);
  root.render(<App />);