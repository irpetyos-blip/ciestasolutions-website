(function(){
  var routes={"":"home","about":"about","method":"method","services":"services","insights":"insights","contact":"contact"};
  function show(){
    var k=(location.hash||"").replace(/^#\/?/,'');
    var id=routes.hasOwnProperty(k)?routes[k]:"home";
    document.querySelectorAll(".page").forEach(function(p){p.classList.toggle("on",p.id==="p-"+id)});
    document.querySelectorAll("nav a").forEach(function(a){
      if(a.getAttribute("href")==="#/"+id) a.setAttribute("aria-current","page"); else a.removeAttribute("aria-current");
    });
    var el=document.getElementById("p-"+id);
    if(el&&el.dataset&&el.dataset.title) document.title=el.dataset.title;
    window.scrollTo(0,0);
  }
  window.addEventListener("hashchange",show);
  show();
})();
