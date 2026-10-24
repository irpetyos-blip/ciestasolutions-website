(function(){
  var routes={"":"home","about":"about","method":"method","services":"services","insights":"insights","contact":"contact"};
  var THEME_KEY="ciesta-theme";
  var THEME_ORDER=["auto","light","dark"];
  var pages = Array.prototype.slice.call(document.querySelectorAll(".page"));
  var navLinks = Array.prototype.slice.call(document.querySelectorAll("nav a"));

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

    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){
      window.scrollTo(0,0);
    } else {
      window.scrollTo({top:0,left:0,behavior:"auto"});
    }
  }

  var button=document.getElementById("theme-toggle");
  if(button) button.addEventListener("click", cycleTheme);

  applyTheme(getSavedTheme(), false);
  show();

  window.addEventListener("hashchange", function(){
    requestAnimationFrame(show);
  });

  var timer = window.setInterval(function(){
    if(getSavedTheme()==="auto") applyTheme("auto", false);
  },600000);
  window.__ciestaThemeTimer = timer;
})();
