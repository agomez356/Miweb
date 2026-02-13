---
name: physics-equation-latex
description: Convert physics equations to LaTeX/KaTeX syntax. Use when working with mathematical equations, physics formulas, MDX blog posts, or when user mentions LaTeX, KaTeX, equations, or mathematical expressions.
allowed-tools: Read, Write
---

# Physics Equation to LaTeX Converter

Convert physics equations from plain text or symbolic notation to proper LaTeX/KaTeX syntax for the FísicaFans blog.

## Instructions

1. **Identify the equation type**: Determine if it's inline math ($...$) or block/display math ($$...$$)
2. **Convert symbols**: Replace plain text with proper LaTeX commands
3. **Structure**: Use correct grouping, fractions, subscripts, superscripts
4. **Verify**: Ensure KaTeX compatibility (subset of LaTeX)
5. **Test syntax**: Check for proper escaping and balanced delimiters

## Inline vs Block Math

**Inline math** - Within a paragraph:
```markdown
La energía de un fotón es $E = h\nu$ donde $h$ es la constante de Planck.
```

**Block math** - Centered, separate line:
```markdown
La ecuación de Schrödinger dependiente del tiempo:

$$
i\hbar\frac{\partial}{\partial t}\Psi(\mathbf{r},t) = \hat{H}\Psi(\mathbf{r},t)
$$
```

## Common Physics Equations

### Classical Mechanics

| Concept | Plain Text | LaTeX |
|---------|-----------|-------|
| Newton's 2nd Law | F = ma | `$F = ma$` |
| Kinetic Energy | KE = (1/2)mv² | `$E_k = \frac{1}{2}mv^2$` |
| Momentum | p = mv | `$\mathbf{p} = m\mathbf{v}$` |
| Work | W = F·d | `$W = \mathbf{F} \cdot \mathbf{d}$` |
| Gravitational Force | F = G(m₁m₂)/r² | `$F = G\frac{m_1 m_2}{r^2}$` |

### Thermodynamics

| Concept | Plain Text | LaTeX |
|---------|-----------|-------|
| First Law | ΔU = Q - W | `$\Delta U = Q - W$` |
| Ideal Gas Law | PV = nRT | `$PV = nRT$` |
| Entropy | ΔS = Q/T | `$\Delta S = \frac{Q}{T}$` |
| Carnot Efficiency | η = 1 - (Tc/Th) | `$\eta = 1 - \frac{T_c}{T_h}$` |

### Electromagnetism

| Concept | Plain Text | LaTeX |
|---------|-----------|-------|
| Coulomb's Law | F = k(q₁q₂)/r² | `$F = k\frac{q_1 q_2}{r^2}$` |
| Electric Field | E = F/q | `$\mathbf{E} = \frac{\mathbf{F}}{q}$` |
| Ohm's Law | V = IR | `$V = IR$` |
| Magnetic Force | F = qvB sin(θ) | `$F = qvB\sin\theta$` |
| Maxwell's Equations | ∇·E = ρ/ε₀ | `$\nabla \cdot \mathbf{E} = \frac{\rho}{\varepsilon_0}$` |

### Quantum Mechanics

| Concept | Plain Text | LaTeX |
|---------|-----------|-------|
| Energy Quantization | E = hν = ℏω | `$E = h\nu = \hbar\omega$` |
| de Broglie | λ = h/p | `$\lambda = \frac{h}{p}$` |
| Heisenberg Uncertainty | ΔxΔp ≥ ℏ/2 | `$\Delta x \Delta p \geq \frac{\hbar}{2}$` |
| Wave Function | ψ(x,t) = A sin(kx - ωt) | `$\psi(x,t) = A\sin(kx - \omega t)$` |
| Schrödinger (time-independent) | Hψ = Eψ | `$\hat{H}\psi = E\psi$` |

### Relativity

| Concept | Plain Text | LaTeX |
|---------|-----------|-------|
| Mass-Energy | E = mc² | `$E = mc^2$` |
| Lorentz Factor | γ = 1/√(1-v²/c²) | `$\gamma = \frac{1}{\sqrt{1-\frac{v^2}{c^2}}}$` |
| Time Dilation | Δt' = γΔt | `$\Delta t' = \gamma \Delta t$` |
| Length Contraction | L = L₀/γ | `$L = \frac{L_0}{\gamma}$` |
| Spacetime Interval | (Δs)² = (cΔt)² - (Δx)² | `$(\Delta s)^2 = (c\Delta t)^2 - (\Delta x)^2$` |

## LaTeX Command Reference

### Greek Letters

| Symbol | Command | Symbol | Command |
|--------|---------|--------|---------|
| α | `\alpha` | Γ | `\Gamma` |
| β | `\beta` | Δ | `\Delta` |
| γ | `\gamma` | Θ | `\Theta` |
| δ | `\delta` | Λ | `\Lambda` |
| ε | `\varepsilon` | Σ | `\Sigma` |
| θ | `\theta` | Ω | `\Omega` |
| λ | `\lambda` | Φ | `\Phi` |
| μ | `\mu` | Ψ | `\Psi` |
| ν | `\nu` | π | `\pi` |
| ρ | `\rho` | τ | `\tau` |
| σ | `\sigma` | ω | `\omega` |
| φ | `\phi` | ℏ | `\hbar` |

### Mathematical Operators

| Operation | Command | Example |
|-----------|---------|---------|
| Fraction | `\frac{num}{den}` | `$\frac{a}{b}$` |
| Square root | `\sqrt{x}` | `$\sqrt{x^2 + y^2}$` |
| Nth root | `\sqrt[n]{x}` | `$\sqrt[3]{8}$` |
| Superscript | `x^2` | `$e^{i\pi}$` |
| Subscript | `x_i` | `$x_{i,j}$` |
| Sum | `\sum_{i=1}^{n}` | `$\sum_{i=1}^{n} x_i$` |
| Integral | `\int_{a}^{b}` | `$\int_{0}^{\infty} e^{-x}dx$` |
| Partial derivative | `\frac{\partial f}{\partial x}` | `$\frac{\partial^2 u}{\partial t^2}$` |
| Vector | `\mathbf{v}` | `$\mathbf{F} = m\mathbf{a}$` |
| Hat (operator) | `\hat{H}` | `$\hat{H}\psi$` |
| Dot product | `\cdot` | `$\mathbf{a} \cdot \mathbf{b}$` |
| Cross product | `\times` | `$\mathbf{a} \times \mathbf{b}$` |
| Nabla | `\nabla` | `$\nabla \times \mathbf{E}$` |

### Spacing and Formatting

| Command | Purpose | Example |
|---------|---------|---------|
| `\,` | Small space | `$a\,b$` |
| `\quad` | Medium space | `$a \quad b$` |
| `\qquad` | Large space | `$a \qquad b$` |
| `\text{}` | Regular text | `$E = mc^2 \text{ where } c \text{ is speed of light}$` |
| `\left( \right)` | Auto-sized parentheses | `$\left(\frac{a}{b}\right)^2$` |
| `\begin{aligned}...\end{aligned}` | Multi-line equations | See below |

### Multi-line Equations

```latex
$$
\begin{aligned}
E &= mc^2 \\
p &= \gamma mv \\
E^2 &= (pc)^2 + (mc^2)^2
\end{aligned}
$$
```

## Common Mistakes to Avoid

1. **Missing delimiters**: Always close `$...$` or `$$...$$`
2. **Unescaped special characters**: Use `\{` `\}` `\_` `\%` for literal characters
3. **Wrong quotes**: Use `'` for prime notation: `$x'$`
4. **Spacing in subscripts**: `x_12` vs `x_{12}` (different meanings)
5. **Operator precedence**: Use `{}` to group: `x^{2+3}` not `x^2+3`

## Conversion Workflow

When user provides an equation:

1. **Parse**: Identify all mathematical symbols and structure
2. **Greek letters**: Convert α, β, γ, etc. to `\alpha`, `\beta`, `\gamma`
3. **Subscripts/superscripts**: Convert `E₀` → `E_0`, `x²` → `x^2`
4. **Fractions**: Convert `/` to `\frac{numerator}{denominator}`
5. **Special functions**: `sin`, `cos`, `log` → `\sin`, `\cos`, `\log`
6. **Vectors**: Add `\mathbf{}` for vector notation
7. **Test**: Verify syntax is KaTeX-compatible

## Example Conversions

**Input:** "The kinetic energy is KE = (1/2)mv² and momentum p = mv"

**Output:**
```markdown
La energía cinética es $E_k = \frac{1}{2}mv^2$ y el momento lineal es $\mathbf{p} = m\mathbf{v}$.
```

**Input:** "Schrödinger equation: iℏ(∂ψ/∂t) = Hψ"

**Output:**
```markdown
$$
i\hbar\frac{\partial\psi}{\partial t} = \hat{H}\psi
$$
```

## Integration with MDX Posts

For physics blog posts, include equations naturally:

```mdx
---
title: "Mecánica Cuántica: Fundamentos"
---

## La Ecuación de Schrödinger

La ecuación fundamental de la mecánica cuántica describe cómo evoluciona la función de onda $\psi$ en el tiempo:

$$
i\hbar\frac{\partial}{\partial t}\Psi(\mathbf{r},t) = \hat{H}\Psi(\mathbf{r},t)
$$

Donde $\hbar = \frac{h}{2\pi}$ es la constante de Planck reducida y $\hat{H}$ es el operador Hamiltoniano.
```

## Validation

Before finalizing, check:
- ✅ Delimiters are balanced ($...$ or $$...$$)
- ✅ Special characters are escaped (`_`, `^`, `{`, `}`, `\`, etc.)
- ✅ Greek letters use proper commands
- ✅ Fractions use `\frac{}{}`
- ✅ Vectors use `\mathbf{}`
- ✅ Operators use `\hat{}` when appropriate
- ✅ Syntax is KaTeX-compatible (no advanced LaTeX packages)

## Reference

For complete equation list, see [common-equations.md](common-equations.md).
