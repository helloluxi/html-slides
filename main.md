# HTML Slides

\subtitle{Xi Lu}
\subsubtitle{School of Mathematical Science, Zhejiang University\\Department of Electrical and Computer Engineering, NC State University}
\today

## Texts

\columns

### Instructions
- Use the arrow keys or mouse scroll to navigate through the slides.
  - Use double finger swipe on mobile.
- Use the ` key to zoom in.
- Use url parameter `?p=` to start from a specific slide.

\column

### Features
- Created from Markdown, to help focus on content
- Instant MathJax
- Interactive animations
- Easily fetch online resources
- Easy last-minute changes when presenting on different devices

\endcolumns

\quote{This is a quote.}{Me}

## Figures

\beginrow
\figure[0.45]{https://placehold.co/800x300/e0e0e0/666666/png?text=Figure+1}{Figure 1}
\endrow

\beginrow
\figure[0.45]{https://placehold.co/380x240/e0e0e0/666666/png?text=Figure+2}{Figure 2}
\figure[0.45]{https://placehold.co/380x240/e0e0e0/666666/png?text=Figure+3}{Figure 3}
\endrow

## Equations

\columns

Point 1 \cite[https://helloluxi.github.io/html-slides]{Github repo.}

$$
\ket{\psi} = \alpha\ket{0} + \beta\ket{1}
$$
$$
\ip{\psi}{\psi} = 1
$$
$$
[\sx, \sy] = 2i\sz
$$

\column

Point 2 \cite[https://helloluxi.github.io/html-slides]{Github page.}

$$
[\q, \p] = i
$$
$$
\a = \frac{1}{\sqrt{2}}(\q + i\p)
$$
$$
I = \frac{1}{\pi} \int \dyad{\alpha}{\alpha} \dd^2{\alpha}
$$

\endcolumns

Inline equation:
$
f(x) = \frac{1}{\sqrt{2\pi}\sigma} e^{-\frac{(x - \mu)^2}{2\sigma^2}}
$.

## Comparisons

\columns
### Powerpoint
- Mouse marathons
- Nightmare of typing equations
- Crashes precisely before you save
\column*
### HTML
- Present anywhere with a browser, even on ad boards
- Interactive animations make people forget we have skipped proofs
- AI has seen more html than anything else...
\column
### Latex Beamer
- Compiling &#x27F3;
- Error: unexpected &#125; in line 342
- Let me spend 6 hours moving this image 2 pixels left
\endcolumn

## Tables

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

## VSCode Highlight

Recommended with \url[vscode highlight extension]{https://marketplace.visualstudio.com/items?itemName=fabiospampinato.vscode-highlight} with settings

```json
{
  "highlight.regexes": {
      "(\\\\(today|(begin|end)row|(|end)column(s?)|(sub|subsub|center)title|figure|qrcode|quote|strong|emph|url|cite|refhtml|resetnumber))": {
      "filterLanguageRegex": "markdown",
      "decorations": [
        { "color": "#aaaaff" }
      ]
    }
  }
}
```

## 

\centertitle{Thank you!}

\beginrow
\qrcode{https://github.com/helloluxi/html-slides}{Github repo}
\qrcode{https://helloluxi.github.io/html-slides}{Github page}
\endrow
