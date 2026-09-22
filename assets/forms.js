async function postForm(form,endpoint,statusId,buttonText){
 const status=document.getElementById(statusId),button=form.querySelector("button"); button.disabled=true; status.textContent="Sending…";
 try{const r=await fetch(endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(Object.fromEntries(new FormData(form)))});const d=await r.json();if(!r.ok||!d.ok)throw new Error(d.error||"Please try again.");status.textContent=d.message||"Saved.";form.reset();}catch(e){status.textContent=e.message||"Something went wrong."}finally{button.disabled=false;button.textContent=buttonText;}
}
document.getElementById("newsletter-form")?.addEventListener("submit",e=>{e.preventDefault();postForm(e.currentTarget,"/api/newsletter","newsletter-status","Subscribe")});
document.getElementById("tool-submit-form")?.addEventListener("submit",e=>{e.preventDefault();postForm(e.currentTarget,"/api/submit-tool","tool-submit-status","Send submission")});