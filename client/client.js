//console.log("YO!");
const sendform=document.querySelector(`.sendform`);
//const load=document.querySelector(`.loader`);
const load = document.querySelector(`.loading`);
const sendsdiv=document.querySelector(`.allsends`);
const apiurl="http://localhost:5000/sends";
const geturl="http://localhost:5000/all";
console.log(load);
load.style.display='none';
getallsends();
sendform.addEventListener('submit',(event)=>{
    event.preventDefault();
    //console.log('submitted?');
    const data=new FormData(sendform);
    const name=data.get('name');    
    const WDYK=data.get('WDYK');
    const objb= {name,WDYK};
    //console.log({name,WDYK});
    sendform.style.display="none";
    load.style.display="";
    fetch(apiurl,{
            method:'POST',
            body:JSON.stringify(objb),
            headers: {
                'content-type':'application/json'
            }
        }).then(resp=>resp.json())
          .then(createdobj=>{
              console.log(createdobj);
              load.style.display="none";
              sendform.reset();
              getallsends();
              sendform.style.display="";
          });
});
function getallsends()
{
    sendsdiv.innerHTML='';
    fetch(geturl)
        .then(res=>res.json())
        .then(send=>{
           // console.log(send);
            send.forEach(record=>{
                const divv=document.createElement('div');
                const header=document.createElement('h3');
                const WD=document.createElement('p');
                const dt=document.createElement('small');
                header.textContent=record.name;
                WD.textContent=record.WDYK;
                dt.textContent=new Date(record.created);    
                divv.appendChild(header);
                divv.appendChild(WD);
                divv.appendChild(dt);
                sendsdiv.appendChild(divv);
            })
        })
}