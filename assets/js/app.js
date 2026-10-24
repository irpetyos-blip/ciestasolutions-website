(function(){
  var routes={"":"home","about":"about","method":"method","services":"services","insights":"insights","contact":"contact"};
  var THEME_KEY="ciesta-theme";
  var THEME_ORDER=["light","dark"];

  function getSystemTheme(){
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function getSavedTheme(){
    try{
      var value=localStorage.getItem(THEME_KEY);
      return value==="light"||value==="dark"?value:getSystemTheme();
    }catch(e){
      return getSystemTheme();
    }
  }

  function applyTheme(mode, persist){
    var theme = mode === "dark" || mode === "light" ? mode : getSystemTheme();
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.style.colorScheme = theme === "dark" ? "dark" : "light";

    var button=document.getElementById("theme-toggle");
    if(button){
      var label = theme === "dark" ? "Dark" : "Light";
      button.textContent = label;
      button.setAttribute("data-theme-mode", theme);
      button.setAttribute("aria-label", "Theme: " + label);
    }

    if(persist){
      try{localStorage.setItem(THEME_KEY, theme);}catch(e){}
    }
  }

  function cycleTheme(){
    var current=getSavedTheme();
    var index=THEME_ORDER.indexOf(current);
    var next=THEME_ORDER[(index+1)%THEME_ORDER.length];
    applyTheme(next, true);
  }

  function show(){
    var pages=document.querySelectorAll(".page");
    var navLinks=document.querySelectorAll("nav a");
    var k=(location.hash||"").replace(/^#\/?/,"");
    var id=Object.prototype.hasOwnProperty.call(routes,k)?routes[k]:"home";
    var targetId="p-"+id;

    pages.forEach(function(p){
      p.classList.toggle("on", p.id === targetId);
    });

    navLinks.forEach(function(a){
      var href=a.getAttribute("href");
      if(href === "#/" + id){
        a.setAttribute("aria-current","page");
      }else if(a.hasAttribute("aria-current")){
        a.removeAttribute("aria-current");
      }
    });

    var el=document.getElementById(targetId);
    if(el&&el.dataset&&el.dataset.title) document.title=el.dataset.title;
    if(window.scrollY !== 0){
      window.scrollTo({top:0,left:0,behavior:"auto"});
    }
  }

  function init(){
    var button=document.getElementById("theme-toggle");
    if(button) button.addEventListener("click", cycleTheme);

    applyTheme(getSavedTheme(), false);
    show();

    window.addEventListener("hashchange", function(){
      requestAnimationFrame(show);
    });
  }

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", init, {once:true});
  } else {
    init();
  }
})();
