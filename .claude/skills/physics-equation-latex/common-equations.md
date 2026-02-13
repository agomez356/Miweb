# Common Physics Equations - Complete Reference

This is a comprehensive reference of 50+ physics equations in LaTeX format for the FísicaFans blog.

## Classical Mechanics (Mecánica Clásica)

### Kinematics
```latex
$v = v_0 + at$ (velocity with constant acceleration)
$x = x_0 + v_0t + \frac{1}{2}at^2$ (position with constant acceleration)
$v^2 = v_0^2 + 2a\Delta x$ (velocity-displacement)
$\omega = \frac{d\theta}{dt}$ (angular velocity)
$\alpha = \frac{d\omega}{dt}$ (angular acceleration)
```

### Dynamics
```latex
$\mathbf{F} = m\mathbf{a}$ (Newton's 2nd law)
$\mathbf{F}_{12} = -\mathbf{F}_{21}$ (Newton's 3rd law)
$F_g = G\frac{m_1 m_2}{r^2}$ (gravitational force)
$F_f = \mu N$ (friction force)
$F_c = \frac{mv^2}{r}$ (centripetal force)
```

### Energy and Work
```latex
$W = \int \mathbf{F} \cdot d\mathbf{s}$ (work)
$E_k = \frac{1}{2}mv^2$ (kinetic energy)
$U_g = mgh$ (gravitational potential energy)
$U_s = \frac{1}{2}kx^2$ (elastic potential energy)
$E_{total} = E_k + U$ (mechanical energy conservation)
```

### Momentum
```latex
$\mathbf{p} = m\mathbf{v}$ (linear momentum)
$\mathbf{F} = \frac{d\mathbf{p}}{dt}$ (Newton's 2nd law - momentum form)
$\mathbf{L} = \mathbf{r} \times \mathbf{p}$ (angular momentum)
$\boldsymbol{\tau} = \frac{d\mathbf{L}}{dt}$ (torque)
```

---

## Thermodynamics (Termodinámica)

### Laws of Thermodynamics
```latex
$\Delta U = Q - W$ (first law)
$\Delta S \geq 0$ (second law - isolated system)
$S = k_B \ln\Omega$ (entropy - Boltzmann)
$dU = TdS - PdV$ (fundamental thermodynamic relation)
```

### Ideal Gas
```latex
$PV = nRT$ (ideal gas law)
$PV = Nk_BT$ (ideal gas law - molecular form)
$U = \frac{3}{2}nRT$ (internal energy - monatomic ideal gas)
$C_P - C_V = nR$ (Mayer's relation)
```

### Processes
```latex
$PV = \text{constant}$ (isothermal process)
$PV^\gamma = \text{constant}$ (adiabatic process, where $\gamma = \frac{C_P}{C_V}$)
$V = \text{constant}$ (isochoric process)
$P = \text{constant}$ (isobaric process)
```

### Heat Engines
```latex
$\eta = \frac{W}{Q_h} = 1 - \frac{Q_c}{Q_h}$ (efficiency)
$\eta_{Carnot} = 1 - \frac{T_c}{T_h}$ (Carnot efficiency)
$COP = \frac{Q_c}{W}$ (coefficient of performance - refrigerator)
```

---

## Electromagnetism (Electromagnetismo)

### Electrostatics
```latex
$\mathbf{F} = k\frac{q_1 q_2}{r^2}\hat{\mathbf{r}}$ (Coulomb's law)
$\mathbf{E} = \frac{\mathbf{F}}{q}$ (electric field)
$V = \frac{U}{q}$ (electric potential)
$\mathbf{E} = -\nabla V$ (electric field from potential)
$\Phi_E = \oint \mathbf{E} \cdot d\mathbf{A}$ (electric flux)
```

### Gauss's Law
```latex
$\oint \mathbf{E} \cdot d\mathbf{A} = \frac{Q_{enc}}{\varepsilon_0}$ (integral form)
$\nabla \cdot \mathbf{E} = \frac{\rho}{\varepsilon_0}$ (differential form)
```

### Capacitance
```latex
$C = \frac{Q}{V}$ (capacitance definition)
$C = \varepsilon_0 \frac{A}{d}$ (parallel plate capacitor)
$U = \frac{1}{2}CV^2 = \frac{1}{2}QV$ (energy stored in capacitor)
```

### Current and Resistance
```latex
$I = \frac{dQ}{dt}$ (current)
$V = IR$ (Ohm's law)
$R = \rho\frac{L}{A}$ (resistance)
$P = IV = I^2R = \frac{V^2}{R}$ (power)
```

### Magnetism
```latex
$\mathbf{F} = q\mathbf{v} \times \mathbf{B}$ (Lorentz force)
$\mathbf{F} = I\mathbf{L} \times \mathbf{B}$ (force on current-carrying wire)
$\boldsymbol{\tau} = \boldsymbol{\mu} \times \mathbf{B}$ (torque on magnetic dipole)
$\Phi_B = \int \mathbf{B} \cdot d\mathbf{A}$ (magnetic flux)
```

### Faraday's Law and Induction
```latex
$\mathcal{E} = -\frac{d\Phi_B}{dt}$ (Faraday's law of induction)
$\mathcal{E} = BLv$ (motional emf)
$L = \frac{\Phi_B}{I}$ (inductance)
$U_L = \frac{1}{2}LI^2$ (energy stored in inductor)
```

### Maxwell's Equations
```latex
$$
\begin{aligned}
\nabla \cdot \mathbf{E} &= \frac{\rho}{\varepsilon_0} \quad \text{(Gauss's law)} \\
\nabla \cdot \mathbf{B} &= 0 \quad \text{(no magnetic monopoles)} \\
\nabla \times \mathbf{E} &= -\frac{\partial \mathbf{B}}{\partial t} \quad \text{(Faraday's law)} \\
\nabla \times \mathbf{B} &= \mu_0\mathbf{J} + \mu_0\varepsilon_0\frac{\partial \mathbf{E}}{\partial t} \quad \text{(Ampère-Maxwell law)}
\end{aligned}
$$
```

### Electromagnetic Waves
```latex
$c = \frac{1}{\sqrt{\mu_0\varepsilon_0}}$ (speed of light in vacuum)
$c = \lambda f$ (wave equation)
$I = \frac{1}{2}\varepsilon_0 c E_0^2$ (intensity of EM wave)
```

---

## Quantum Mechanics (Mecánica Cuántica)

### Foundations
```latex
$E = h\nu = \hbar\omega$ (photon energy)
$p = \frac{h}{\lambda}$ (de Broglie wavelength)
$\lambda = \frac{h}{p}$ (de Broglie relation)
$\Delta x \Delta p \geq \frac{\hbar}{2}$ (Heisenberg uncertainty principle)
$\Delta E \Delta t \geq \frac{\hbar}{2}$ (energy-time uncertainty)
```

### Wave Function
```latex
$\psi(x,t) = A e^{i(kx - \omega t)}$ (plane wave)
$|\psi(x,t)|^2$ (probability density)
$\int_{-\infty}^{\infty} |\psi(x,t)|^2 dx = 1$ (normalization)
$\langle x \rangle = \int_{-\infty}^{\infty} x|\psi(x)|^2 dx$ (expectation value of position)
```

### Schrödinger Equation
```latex
$i\hbar\frac{\partial\psi}{\partial t} = \hat{H}\psi$ (time-dependent)
$\hat{H}\psi = E\psi$ (time-independent)
$\hat{H} = -\frac{\hbar^2}{2m}\frac{d^2}{dx^2} + V(x)$ (Hamiltonian operator - 1D)
```

### Operators
```latex
$\hat{x} = x$ (position operator)
$\hat{p} = -i\hbar\frac{\partial}{\partial x}$ (momentum operator)
$\hat{E} = i\hbar\frac{\partial}{\partial t}$ (energy operator)
$[\hat{x}, \hat{p}] = i\hbar$ (canonical commutation relation)
```

### Hydrogen Atom
```latex
$E_n = -\frac{13.6\text{ eV}}{n^2}$ (energy levels)
$r_n = n^2 a_0$ (Bohr radius, where $a_0 = 0.529$ Å)
$L = \sqrt{l(l+1)}\hbar$ (angular momentum)
```

---

## Relativity (Relatividad)

### Special Relativity
```latex
$c = 299792458\text{ m/s}$ (speed of light)
$E = mc^2$ (mass-energy equivalence)
$\gamma = \frac{1}{\sqrt{1-\frac{v^2}{c^2}}}$ (Lorentz factor)
$\Delta t' = \gamma \Delta t$ (time dilation)
$L = \frac{L_0}{\gamma}$ (length contraction)
$m = \gamma m_0$ (relativistic mass)
```

### Relativistic Dynamics
```latex
$\mathbf{p} = \gamma m_0 \mathbf{v}$ (relativistic momentum)
$E = \gamma m_0 c^2$ (total energy)
$E^2 = (pc)^2 + (m_0c^2)^2$ (energy-momentum relation)
$E_k = (\gamma - 1)m_0c^2$ (kinetic energy)
```

### Lorentz Transformation
```latex
$$
\begin{aligned}
x' &= \gamma(x - vt) \\
y' &= y \\
z' &= z \\
t' &= \gamma\left(t - \frac{vx}{c^2}\right)
\end{aligned}
$$
```

### Spacetime
```latex
$(\Delta s)^2 = (c\Delta t)^2 - (\Delta x)^2 - (\Delta y)^2 - (\Delta z)^2$ (spacetime interval)
$ds^2 = c^2dt^2 - dx^2 - dy^2 - dz^2$ (Minkowski metric)
```

---

## Physical Constants (Constantes Físicas)

```latex
$c = 299792458\text{ m/s}$ (speed of light)
$G = 6.674 \times 10^{-11}\text{ N·m}^2\text{/kg}^2$ (gravitational constant)
$h = 6.626 \times 10^{-34}\text{ J·s}$ (Planck's constant)
$\hbar = \frac{h}{2\pi} = 1.055 \times 10^{-34}\text{ J·s}$ (reduced Planck's constant)
$k_B = 1.381 \times 10^{-23}\text{ J/K}$ (Boltzmann constant)
$N_A = 6.022 \times 10^{23}\text{ mol}^{-1}$ (Avogadro's number)
$R = 8.314\text{ J/(mol·K)}$ (gas constant)
$\varepsilon_0 = 8.854 \times 10^{-12}\text{ F/m}$ (permittivity of free space)
$\mu_0 = 4\pi \times 10^{-7}\text{ H/m}$ (permeability of free space)
$e = 1.602 \times 10^{-19}\text{ C}$ (elementary charge)
$m_e = 9.109 \times 10^{-31}\text{ kg}$ (electron mass)
$m_p = 1.673 \times 10^{-27}\text{ kg}$ (proton mass)
```

---

## Usage Tips

1. **Copy-paste ready**: All equations can be copied directly into MDX files
2. **Inline or block**: Use `$...$` for inline, `$$...$$` for display
3. **Explanatory text**: Always include `\text{}` for units and descriptions
4. **Consistency**: Use the same notation across all blog posts
5. **Verification**: Test all equations in KaTeX renderer before publishing
