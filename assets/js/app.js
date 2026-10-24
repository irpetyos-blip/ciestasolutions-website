(function(){
  var routes={"":"home","about":"about","method":"method","services":"services","insights":"insights","contact":"contact"};
  var THEME_KEY="ciesta-theme";
  var THEME_ORDER=["auto","light","dark"];

  function getSavedTheme(){
    try{
      var value=localStorage.getItem(THEME_KEY);
      return value==="light"||value==="dark"||value==="auto"?value:"auto";
    }catch(e){
      return "auto";
    }
  }

  function getAutoTheme(date){
    var hour=(date||new Date()).getHours();
    return hour>=6&&hour<19?"light":"dark";
  }

  function applyTheme(mode, persist){
    var theme = mode === "auto" ? getAutoTheme() : mode;
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.style.colorScheme = theme === "dark" ? "dark" : "light";
    var button=document.getElementById("theme-toggle");
    if(button){
      button.textContent = mode.charAt(0).toUpperCase() + mode.slice(1);
      button.setAttribute("data-theme-mode", mode);
      button.setAttribute("aria-label", "Theme: " + mode + " — choose Auto, Light or Dark");
    }
    if(persist){
      try{localStorage.setItem(THEME_KEY, mode);}catch(e){}
    }
  }

  function cycleTheme(){
    var current=getSavedTheme();
    var index=THEME_ORDER.indexOf(current);
    var next=THEME_ORDER[(index+1)%THEME_ORDER.length];
    applyTheme(next, true);
  }

  function show(){
    var k=(location.hash||"").replace(/^#\/?/,"");
    var id=routes.hasOwnProperty(k)?routes[k]:"home";
    document.querySelectorAll(".page").forEach(function(p){p.classList.toggle("on",p.id==="p-"+id)});
    document.querySelectorAll("nav a").forEach(function(a){
      if(a.getAttribute("href")==="#/"+id) a.setAttribute("aria-current","page"); else a.removeAttribute("aria-current");
    });
    var el=document.getElementById("p-"+id);
    if(el&&el.dataset&&el.dataset.title) document.title=el.dataset.title;
    window.scrollTo(0,0);
  }

  var button=document.getElementById("theme-toggle");
  if(button) button.addEventListener("click", cycleTheme);

  applyTheme(getSavedTheme(), false);
  show();

  window.addEventListener("hashchange", show);
  setInterval(function(){
    if(getSavedTheme()==="auto") applyTheme("auto", false);
  },600000);
})();
