# HTML Slides

<div>
  <p class="subtitle">
  Xi Lu
  </p>
  <p class="subsubtitle">
  School of Mathematical Science, Zhejiang University
  <br>
  Department of Electrical and Computer Engineering, NC State University
  </p>
</div>

<p id="current-date" style="font-size: 2rem;"></p>

<script>
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    dateElement.textContent = `${formattedDate}`;
    }
</script>

## Texts

<div class="columns">
<div class="column">

### Point 1
- Point 1.1
- Point 1.2
- Point 1.3
  - Point 1.3.1
  - Point 1.3.2
- Point 1.4

</div>

<div class="column">

### Point 2
- Point 2.1
- Point 2.2
- Point 2.3
  - Point 2.3.1
  - Point 2.3.2
- Point 2.4

</div>
</div>

<div class="quote-container">
<p class="quote-text">"This is a funny quote."</p>
<p class="quote-author">- Me</p>
</div>

## Figures

<div class="figure-row">
  <div class="figure" img="https://placehold.co/800x300/e0e0e0/666666/png?text=Figure+1" caption="Figure 1" ratio="0.45">
  </div>
</div>

<div class="figure-row">
  <div class="figure" img="https://placehold.co/380x240/e0e0e0/666666/png?text=Figure+2" caption="Figure 2" ratio="0.45">
  </div>
  <div class="figure" img="https://placehold.co/380x240/e0e0e0/666666/png?text=Figure+3" caption="Figure 3" ratio="0.45">
  </div>
</div>

## Equations

<div class="columns" data-weights="1fr 1.5fr">
<div class="column">

<p> Point 1 <a href="https://github.com/helloluxi/html-slides" class="footnote-cite">Github repo.</a> </p>

<p class="equation">
\ket{\psi} = \alpha\ket{0} + \beta\ket{1}
</p>
<p class="equation">
\ip{\psi}{\psi} = 1
</p>
<p class="equation">
[\sx, \sy] = 2i\sz
</p>

</div>

<div class="column">

<p> Point 2 <a href="https://helloluxi.github.io/html-slides" class="footnote-cite">Github page.</a> </p>

<p class="equation">
[\q, \p] = i
</p>
<p class="equation">
\a = \frac{1}{\sqrt{2}}(\q + i\p)
</p>
<p class="equation">
I = \frac{1}{\pi} \int \dyad{\alpha}{\alpha} \dd^2{\alpha}
</p>

</div>
</div>

Inline equation: $f(x) = \frac{1}{\sqrt{2\pi}\sigma} e^{-\frac{(x - \mu)^2}{2\sigma^2}}$.

## Comparisons

<div class="compare-table">
<div class="compare-item">

### Powerpoint
- Mouse marathons for aligning anything
- Is that WordArt from the Clinton administration?
- I gave up on typing equations after the second slide
- Crashes precisely before you save

</div>
<div class="compare-item highlight">

### HTML
- Tags and scripts are just morning coffee for PhD students
- Interactive animations that make audience forget you skipped a proof
- Present anywhere with a browser, even on ad boards
- Just fetch

</div>
<div class="compare-item">

### Latex Beamer
- Compiling &#x27F3;
- Error: unexpected &#125; in line 342
- Let me spend 6 hours moving this image 2 pixels left
- My 47 theorem proofs compensate for my Comic Sans title

</div>
</div>

## Tables

<div class="slide-content">
  <table>
    <thead>
      <tr>
        <th>Point 1.1</th>
        <th>Point 1.2</th>
        <th>Point 1.3</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Point 2.1</td>
        <td>Point 2.2</td>
        <td>Point 2.3</td>
      </tr>
      <tr>
        <td>Point 3.1</td>
        <td>Point 3.2</td>
        <td>Point 3.3</td>
      </tr>
      <tr>
        <td>Point 4.1</td>
        <td>Point 4.2</td>
        <td>Point 4.3</td>
      </tr>
    </tbody>
  </table>
</div>

## Animations

<div class="animation-container">
<div id="animated-ball" class="animated-element"></div>
</div>
<div class="slider-container">
<label for="animation-slider">This is the best part of HTML slides!</label>
<input type="range" id="animation-slider" class="slider" min="0" max="100" value="0" oninput="updateBallPosition(this.value)">
<p class="slider-value">Progress: <span id="slider-value">0</span>%</p>
</div>

<script>
  function updateBallPosition(value) {
    const ball = document.getElementById('animated-ball');
    const sliderValue = document.getElementById('slider-value');
    ball.style.left = `calc(${value}% - 25px)`;
    sliderValue.textContent = value;
  }
</script>

## 

<div class="figure-row">
  <h1 style="font-size: 6rem; color: #3498db; text-align: center;">Thank you!</h1>
</div>

<div class="figure-row" style="margin-top: 6rem;">
  <div class="figure" img="https://placehold.co/300x300/e0e0e0/666666/png?text=QR+Code+1" ratio="0.5" caption="QR Code 1">
  </div>
  <div class="figure" img="https://placehold.co/300x300/e0e0e0/666666/png?text=QR+Code+2" ratio="0.5" caption="QR Code 2">
  </div>
</div>
