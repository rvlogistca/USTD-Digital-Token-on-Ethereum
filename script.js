<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">  
  <defs>  
    <radialGradient id="green" cx="50%" cy="40%" r="65%">  
      <stop offset="0%" stop-color="#087a50"/>  
      <stop offset="55%" stop-color="#045b3c"/>  
      <stop offset="100%" stop-color="#021f16"/>  
    </radialGradient>  <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">  
  <stop offset="0%" stop-color="#fff1b0"/>  
  <stop offset="25%" stop-color="#e8c86d"/>  
  <stop offset="55%" stop-color="#fff0a8"/>  
  <stop offset="80%" stop-color="#b8892d"/>  
  <stop offset="100%" stop-color="#f5d77d"/>  
</linearGradient>  

<filter id="shadow" x="-30%" y="-30%" width="160%" height="160%">  
  <feDropShadow  
    dx="0"  
    dy="8"  
    stdDeviation="8"  
    flood-color="#000000"  
    flood-opacity="0.65"/>  
</filter>  

<filter id="glow">  
  <feGaussianBlur stdDeviation="4" result="blur"/>  
  <feMerge>  
    <feMergeNode in="blur"/>  
    <feMergeNode in="SourceGraphic"/>  
  </feMerge>  
</filter>

  </defs>    <!-- Fundo -->  <circle  
cx="256"  
cy="256"  
r="247"  
fill="#020403"/>

  <!-- Borda externa dourada -->  <circle  
cx="256"  
cy="256"  
r="232"  
fill="url(#green)"  
stroke="url(#gold)"  
stroke-width="12"  
filter="url(#shadow)"/>

  <!-- Anel interno -->  <circle  
cx="256"  
cy="256"  
r="195"  
fill="#03452f"  
stroke="url(#gold)"  
stroke-width="6"/>

  <!-- Circuitos -->  <g  
fill="none"  
stroke="#19a96f"  
stroke-width="4"  
opacity="0.55">

<path d="M85 180h55l35-35h45"/>  
<path d="M427 180h-55l-35-35h-45"/>  

<path d="M75 290h65l35 35h45"/>  
<path d="M437 290h-65l-35 35h-45"/>  

<path d="M125 120v45l-25 25"/>  
<path d="M387 120v45l25 25"/>  

<path d="M125 392v-45l-25-25"/>  
<path d="M387 392v-45l25-25"/>

  </g>    <g fill="#20c987">  
    <circle cx="140" cy="180" r="6"/>  
    <circle cx="372" cy="180" r="6"/>  
    <circle cx="140" cy="290" r="6"/>  
    <circle cx="372" cy="290" r="6"/>  
    <circle cx="125" cy="120" r="6"/>  
    <circle cx="387" cy="120" r="6"/>  
  </g>    <!-- Símbolo USTD -->    <g fill="url(#gold)" stroke="#8d681f" stroke-width="3" filter="url(#shadow)">  <!-- Barra superior -->  
<rect  
  x="145"  
  y="120"  
  width="222"  
  height="48"  
  rx="4"/>  

<!-- Haste -->  
<rect  
  x="225"  
  y="155"  
  width="62"  
  height="165"  
  rx="4"/>  

<!-- Arco -->  
<path  
  d="  
    M135 172  
    C135 172 145 225 256 225  
    C367 225 377 172 377 172  
    C377 172 377 270 256 270  
    C135 270 135 172 135 172  
    Z"/>

  </g>    <!-- Texto USTD -->  <text  
x="256"  
y="365"  
text-anchor="middle"  
font-family="Arial, Helvetica, sans-serif"  
font-size="72"  
font-weight="900"  
letter-spacing="3"  
fill="url(#gold)"  
stroke="#805c18"  
stroke-width="2"  
paint-order="stroke">
USTD
</text>

  <!-- Brilho -->  <circle  
cx="105"  
cy="145"  
r="5"  
fill="#fff4b5"  
filter="url(#glow)"/>

<circle  
cx="407"  
cy="355"  
r="4"  
fill="#fff4b5"  
filter="url(#glow)"/>

  <!-- Borda final -->  <circle  
cx="256"  
cy="256"  
r="232"  
fill="none"  
stroke="#f4d77c"  
stroke-width="2"  
opacity="0.8"/>
</svg>
