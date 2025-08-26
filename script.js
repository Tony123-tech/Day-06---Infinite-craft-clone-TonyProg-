    // Element database for fun combinations
    const baseElements = [
      "Fire", "Water", "Earth", "Air", "Light", "Shadow", "Metal", "Electricity", "Crystal", "Virus", "Robot", "Cyber", "Neon", "Plasma", "Dream", "Logic", "Quantum", "Pixel", "Code", "Energy", "Cloud", "Sun", "Moon", "Star", "AI"
    ];
    const combos = {
      "Fire+Water": "Steam",
      "Earth+Water": "Mud",
      "Fire+Earth": "Lava",
      "Earth+Air": "Dust",
      "Water+Air": "Cloud",
      "Light+Shadow": "Twilight",
      "Fire+Metal": "Molten Alloy",
      "Electricity+Water": "Shockwave",
      "Crystal+Light": "Laser",
      "Virus+Robot": "Nanobot",
      "Cyber+Neon": "Synthwave",
      "Plasma+Dream": "Lucid Plasma",
      "Logic+Quantum": "Paradox",
      "Pixel+Code": "Program",
      "Energy+Moon": "Lunar Flux",
      "AI+Quantum": "Singularity",
      "Star+Shadow": "Black Hole",
      "Robot+Electricity": "Android",
      "Pixel+Dream": "Virtuality",
      "Virus+Code": "Malware",
      "Cyber+AI": "Cyber Intelligence",
      "Neon+Electricity": "Neon Spark",
      "Sun+Moon": "Eclipse"
    };

    let history = [];

    // Infinite craft logic
    function craftElement() {
      const a = document.getElementById('elementA').value.trim();
      const b = document.getElementById('elementB').value.trim();
      if (!a || !b) {
        showResult("Please enter two elements to craft.", "error");
        return;
      }
      const key1 = `${a}+${b}`;
      const key2 = `${b}+${a}`;
      let result;
      if (combos[key1]) result = combos[key1];
      else if (combos[key2]) result = combos[key2];
      else result = generateInfiniteCraft(a, b);
      showResult(`${a} + ${b} = <span class="neon">${result}</span>`);
      addHistory(a, b, result);
    }
    // Generate new element name infinitely
    function generateInfiniteCraft(a, b) {
      // Vibe for cyberpunk style: mash-up, suffixes & prefixes, randomization
      const cyberSuffixes = ["X", "Wave", "Core", "Synth", "Bot", "Flux", "Matrix", "Pulse", "Edge", "Zone", "Hack", "Link", "Byte", "Vibe", "Circuit", "Net", "Dream", "Nova"];
      const cyberPrefixes = ["Neo", "Cyber", "Nano", "Quantum", "Hyper", "Meta", "Synth", "Ultra", "Pixel", "Plasma", "Null", "Dark", "Light", "AI"];
      // Randomly decide mash-up style
      const mashup = [
        `${a}${b}${pick(cyberSuffixes)}`,
        `${pick(cyberPrefixes)}${a}`,
        `${pick(cyberPrefixes)}${b}`,
        `${a}-${b} ${pick(cyberSuffixes)}`,
        `${a} ${pick(cyberSuffixes)}`,
        `${b} ${pick(cyberSuffixes)}`,
        `${a.charAt(0).toUpperCase()+a.slice(1)}${b.charAt(0).toUpperCase()+b.slice(1)}`,
        `${a.substring(0,3)}${b.substring(0,3)}${pick(cyberSuffixes)}`
      ];
      // Pick random mashup
      return mashup[Math.floor(Math.random()*mashup.length)];
    }
    function pick(arr) {
      return arr[Math.floor(Math.random()*arr.length)];
    }

    function showResult(msg, type) {
      const cr = document.getElementById("craftResult");
      cr.innerHTML = `<div class="fade-in" style="font-size:1.3rem;${type==='error'?'color:#ff4f6d;':''}">${msg}</div>`;
    }

    function addHistory(a, b, result) {
      history.unshift({a,b,result});
      renderHistory();
    }
    function renderHistory() {
      const h = document.getElementById("history");
      if (history.length === 0) {
        h.innerHTML = `<span style="color:#3d8aff;">No crafts yet. Start by combining elements!</span>`;
        return;
      }
      h.innerHTML = history.slice(0,10).map(entry=>{
        return `<div class="fade-in mb-2">
          <span style="color:#ff4f6d;">${entry.a}</span>
          <span class="neon text-base">+</span>
          <span style="color:#00ffe7;">${entry.b}</span>
          <span>=</span>
          <span class="neon font-bold">${entry.result}</span>
        </div>`;
      }).join('');
    }

    function randomElements() {
      document.getElementById('elementA').value = pick(baseElements);
      document.getElementById('elementB').value = pick(baseElements);
      craftElement();
    }

    // Dark mode toggle
    const darkToggle = document.getElementById('darkToggle');
    darkToggle.addEventListener('change', toggleDark);

    function toggleDark() {
      const body = document.body;
      if (darkToggle.checked) {
        body.classList.add('cyberpunk');
      } else {
        body.classList.remove('cyberpunk');
        body.style.background = "linear-gradient(135deg,#f4f7fa 0%,#e3e7ff 100%)";
        body.style.color = "#222";
        // Change glass panels
        document.querySelectorAll('.glass').forEach(el=>{
          el.style.background = "rgba(230,235,245,0.90)";
          el.style.borderColor = "#3d8aff";
          el.style.boxShadow = "0 0 30px #3d8aff11, 0 0 10px #00ffe722";
        });
      }
      // Reset when toggled ON
      if (darkToggle.checked) {
        body.style.background = "";
        body.style.color = "";
        document.querySelectorAll('.glass').forEach(el=>{
          el.style.background = "";
          el.style.borderColor = "";
          el.style.boxShadow = "";
        });
      }
    }

    // Initial history
    renderHistory();
