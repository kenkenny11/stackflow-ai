const tools=[
{name:"Make",slug:"make",category:"Workflow Automation",price:"Freemium",rating:"4.8",initial:"M",desc:"Visual automation for connecting apps, APIs and data.",tags:["automation","workflow","marketing","no-code"],free:true},
{name:"Zapier",slug:"zapier",category:"Workflow Automation",price:"Freemium",rating:"4.7",initial:"Z",desc:"Automation platform for connecting business apps.",tags:["automation","workflow","marketing","no-code"],free:true},
{name:"ChatGPT",slug:"chatgpt",category:"AI Assistants",price:"Freemium",rating:"4.8",initial:"C",desc:"AI assistant for writing, research, analysis and tasks.",tags:["writing","coding","research","assistant","productivity"],free:true},
{name:"Claude",slug:"claude",category:"AI Assistants",price:"Freemium",rating:"4.7",initial:"A",desc:"AI assistant for writing, analysis, coding and research.",tags:["writing","coding","research","assistant"],free:true},
{name:"n8n",slug:"n8n",category:"Workflow Automation",price:"Free/self-hosted",rating:"4.7",initial:"N",desc:"Flexible workflow automation with developer controls.",tags:["automation","workflow","coding","developer"],free:true},
{name:"Canva",slug:"canva",category:"Video & Creative",price:"Freemium",rating:"4.7",initial:"C",desc:"Design platform for graphics, presentations and content.",tags:["design","video","creative","marketing"],free:true},
{name:"Runway",slug:"runway",category:"Video & Creative",price:"Free + paid",rating:"4.6",initial:"R",desc:"AI tools for generating and editing video.",tags:["video","creative","generation"],free:true},
{name:"Hugging Face",slug:"hugging-face",category:"Developer Tools",price:"Free + paid",rating:"4.6",initial:"H",desc:"Models, datasets and developer tools for machine learning.",tags:["coding","developer","models","machine learning"],free:true},
{name:"Perplexity",slug:"perplexity",category:"Research",price:"Freemium",rating:"4.7",initial:"P",desc:"AI-powered search and research assistant.",tags:["research","search","writing","assistant"],free:true}
];
const grid=document.querySelector("#tool-grid");
const count=document.querySelector("#result-count");
function render(list){
 if(!grid)return;
 grid.innerHTML=list.map(t=>'<a class="card" href="/tool/'+t.slug+'/"><div class="card-top"><div class="icon">'+t.initial+'</div><div class="rating">★ '+t.rating+'</div></div><h3>'+t.name+'</h3><div class="muted">'+t.desc+'</div><span class="tag">'+t.category+'</span><span class="tag">'+t.price+'</span></a>').join("")||'<div class="card"><h3>No matching tools</h3><p class="muted">Try another category, use case or search term.</p></div>';
 if(count)count.textContent=list.length+" tools";
}
function filterTools(q){
 q=q.trim().toLowerCase();
 return tools.filter(t=>(t.name+" "+t.category+" "+t.price+" "+t.desc+" "+t.tags.join(" ")).toLowerCase().includes(q));
}
render(tools);
const input=document.querySelector("#search"),suggest=document.querySelector("#suggestions");
if(input){
 input.addEventListener("input",function(){
  const q=input.value.trim();
  const found=filterTools(q);
  render(found);
  if(!suggest)return;
  suggest.innerHTML=q?found.slice(0,6).map(t=>'<a class="suggestion" href="/tool/'+t.slug+'/">'+t.name+' — '+t.category+'</a>').join("")||'<div class="suggestion">No matching tool yet. Try another search.</div>':"";
 });
 document.querySelectorAll(".chips button").forEach(b=>b.addEventListener("click",()=>{input.value=b.dataset.q;input.dispatchEvent(new Event("input"));}));
}
document.querySelectorAll("[data-filter]").forEach(b=>b.addEventListener("click",()=>{const q=b.dataset.filter||"";if(input){input.value=q;input.dispatchEvent(new Event("input"));}}));