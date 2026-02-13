---
name: physics-content-validator
description: Validate scientific accuracy of physics content including equations, units, constants, and common misconceptions. Use when writing or reviewing physics content, blog posts, or educational material.
allowed-tools: Read
---

# Physics Content Validator

Validate the scientific accuracy of physics content for the FísicaFans blog to ensure educational credibility and correctness.

## Validation Areas

1. **Equations**: Correct formulas and proper notation
2. **Units**: SI units and dimensional analysis
3. **Constants**: Accurate physical constant values
4. **Terminology**: Proper physics terminology
5. **Common Mistakes**: Avoid typical physics misconceptions

## Physical Constants Reference

### Fundamental Constants

| Constant | Symbol | Value | Units |
|----------|--------|-------|-------|
| Speed of light | c | 299,792,458 | m/s (exact) |
| Planck constant | h | 6.62607015 × 10⁻³⁴ | J·s (exact) |
| Reduced Planck | ℏ | 1.054571817 × 10⁻³⁴ | J·s |
| Gravitational constant | G | 6.67430 × 10⁻¹¹ | N·m²/kg² |
| Elementary charge | e | 1.602176634 × 10⁻¹⁹ | C (exact) |
| Boltzmann constant | k_B | 1.380649 × 10⁻²³ | J/K (exact) |
| Avogadro's number | N_A | 6.02214076 × 10²³ | mol⁻¹ (exact) |
| Gas constant | R | 8.314462618 | J/(mol·K) |

### Electromagnetic Constants

| Constant | Symbol | Value | Units |
|----------|--------|-------|-------|
| Permittivity of free space | ε₀ | 8.854187817 × 10⁻¹² | F/m |
| Permeability of free space | μ₀ | 1.25663706212 × 10⁻⁶ | H/m |
| Coulomb constant | k_e | 8.9875517923 × 10⁹ | N·m²/C² |

### Particle Masses

| Particle | Symbol | Mass (kg) | Mass (MeV/c²) |
|----------|--------|-----------|---------------|
| Electron | m_e | 9.1093837015 × 10⁻³¹ | 0.51099895 |
| Proton | m_p | 1.67262192369 × 10⁻²⁷ | 938.27208816 |
| Neutron | m_n | 1.67492749804 × 10⁻²⁷ | 939.56542052 |

## SI Units Validation

### Base SI Units

| Quantity | Unit | Symbol |
|----------|------|--------|
| Length | meter | m |
| Mass | kilogram | kg |
| Time | second | s |
| Electric current | ampere | A |
| Temperature | kelvin | K |
| Amount of substance | mole | mol |
| Luminous intensity | candela | cd |

### Derived SI Units (Common in Physics)

| Quantity | Unit | Symbol | In Base Units |
|----------|------|--------|---------------|
| Force | newton | N | kg·m/s² |
| Energy | joule | J | kg·m²/s² |
| Power | watt | W | kg·m²/s³ |
| Pressure | pascal | Pa | kg/(m·s²) |
| Frequency | hertz | Hz | s⁻¹ |
| Electric charge | coulomb | C | A·s |
| Voltage | volt | V | kg·m²/(A·s³) |
| Resistance | ohm | Ω | kg·m²/(A²·s³) |
| Magnetic field | tesla | T | kg/(A·s²) |

### Common Unit Errors to Avoid

❌ **Wrong**: "Energy is measured in watts"
✅ **Correct**: "Power is measured in watts; energy is measured in joules"

❌ **Wrong**: "Mass in grams"
✅ **Correct**: "Mass in kilograms (kg is the SI base unit)"

❌ **Wrong**: "Temperature in Celsius"
✅ **Correct**: "Temperature in kelvin (K is the SI base unit; °C is derived)"

❌ **Wrong**: "Force = ma newtons"
✅ **Correct**: "Force = ma, measured in newtons (N)"

## Equation Validation Checklist

### Classical Mechanics

✅ **Correct Equations:**
- Newton's 2nd Law: F = ma
- Kinetic Energy: E_k = ½mv²
- Gravitational Force: F = Gm₁m₂/r²
- Momentum: p = mv

❌ **Common Mistakes:**
- F = ma² (wrong exponent)
- E_k = mv² (missing ½ factor)
- p = m/v (inverted formula)

### Thermodynamics

✅ **Correct Equations:**
- First Law: ΔU = Q - W (with sign convention)
- Ideal Gas: PV = nRT
- Entropy: ΔS = Q/T (for reversible processes)

❌ **Common Mistakes:**
- ΔU = Q + W (wrong sign convention - depends on convention used, but be consistent!)
- PV = RT (missing mole count n)

### Electromagnetism

✅ **Correct Equations:**
- Coulomb's Law: F = k_e q₁q₂/r²
- Electric Field: E = F/q
- Ohm's Law: V = IR
- Lorentz Force: F = q(E + v × B)

❌ **Common Mistakes:**
- F = k_e q₁q₂/r (missing square on r)
- V = I/R (inverted formula)

### Quantum Mechanics

✅ **Correct Equations:**
- Photon Energy: E = hν = ℏω
- de Broglie: λ = h/p
- Uncertainty: Δx·Δp ≥ ℏ/2 (not just ℏ!)
- Schrödinger: iℏ∂ψ/∂t = Ĥψ

❌ **Common Mistakes:**
- E = ℏν (should be hν, or ℏω)
- Δx·Δp ≥ ℏ (missing /2 factor)
- Omitting the "i" in Schrödinger equation

### Relativity

✅ **Correct Equations:**
- Mass-Energy: E = mc²
- Lorentz Factor: γ = 1/√(1 - v²/c²)
- Energy-Momentum: E² = (pc)² + (m₀c²)²

❌ **Common Mistakes:**
- E = mc (missing square)
- γ = √(1 - v²/c²) (should be 1/√...)

## Common Physics Misconceptions

### 1. Centrifugal Force

❌ **Misconception**: "Centrifugal force pulls objects outward in circular motion"
✅ **Correct**: "Centrifugal force is a fictitious force in rotating reference frames. The real force is centripetal (inward)."

### 2. Heat vs Temperature

❌ **Misconception**: "Heat and temperature are the same thing"
✅ **Correct**: "Heat is energy transfer (measured in joules), temperature is average kinetic energy (measured in kelvin)"

### 3. Gravity in Space

❌ **Misconception**: "There's no gravity in space"
✅ **Correct**: "Gravity exists everywhere; astronauts experience microgravity due to continuous freefall (orbit)"

### 4. Heisenberg Uncertainty

❌ **Misconception**: "We can't measure position and momentum because our instruments disturb the particle"
✅ **Correct**: "Uncertainty is fundamental to quantum mechanics, not a measurement limitation"

### 5. Speed of Light

❌ **Misconception**: "Nothing can go faster than light"
✅ **Correct (more precise)**: "Nothing can travel faster than c through spacetime; information cannot travel faster than c"

### 6. E=mc²

❌ **Misconception**: "E=mc² only applies to nuclear reactions"
✅ **Correct**: "E=mc² is universal mass-energy equivalence; applies to all energy (including chemical bonds, heat, etc.)"

### 7. Conservation of Energy

❌ **Misconception**: "Energy is never lost"
✅ **Correct**: "Energy is conserved (not lost), but can be transformed into less useful forms (entropy increases)"

## Terminology Validation

### Correct vs Incorrect Terms

| Correct | Incorrect | Notes |
|---------|-----------|-------|
| Speed of light (c) | Light speed | Use "speed of light" |
| Kinetic energy | Kinetic power | Energy, not power |
| Electric field | Electrical field | "Electric" is correct |
| Photon | Light particle | Photon is the technical term |
| Wavelength | Wave length | One word |
| Reference frame | Frame of reference | "Reference frame" is standard |

## Content Review Process

When reviewing physics content:

1. **Read for comprehension**: Does the explanation make sense?
2. **Check equations**: Are formulas correct and properly formatted?
3. **Verify units**: Are SI units used consistently?
4. **Validate constants**: Are physical constants accurate?
5. **Confirm terminology**: Is physics jargon used correctly?
6. **Check for misconceptions**: Does content reinforce or debunk common myths?
7. **Verify sources**: Are claims backed by reputable sources?

## Example Validation

### ❌ Incorrect Content

> "The energy of light is measured in watts and depends on its amplitude. The formula is E = hλ where h is Planck's constant and λ is wavelength. Temperature is measured in Celsius."

**Problems:**
1. Energy is measured in joules, not watts (power)
2. E = hλ is wrong; should be E = hν = hc/λ
3. Temperature SI unit is kelvin, not Celsius

### ✅ Corrected Content

> "The energy of a photon is measured in joules and depends on its frequency. The formula is E = hν (or E = hc/λ), where h = 6.626×10⁻³⁴ J·s is Planck's constant, ν is frequency, and λ is wavelength. For thermodynamic temperature, the SI unit is kelvin (K)."

## Red Flags (Immediate Review Needed)

🚩 **Equations without units specified**
🚩 **Constants without values or incorrect values**
🚩 **"Heat energy" vs "thermal energy" (be precise)**
🚩 **Mixing different unit systems (SI + imperial)**
🚩 **Claiming something is "impossible" in physics (usually nuanced)**
🚩 **Missing significant figures in calculations**
🚩 **Confusing vectors and scalars (F vs |F|)**

## Validation Checklist

Before publishing physics content:

- [ ] All equations use correct formulas
- [ ] LaTeX notation is accurate
- [ ] SI units used consistently
- [ ] Physical constants have correct values
- [ ] No common misconceptions reinforced
- [ ] Terminology is technically correct
- [ ] Claims are scientifically accurate
- [ ] Sources cited where appropriate
- [ ] Dimensional analysis checks out
- [ ] Sign conventions explained (where relevant)

## Resources for Verification

1. **NIST Physical Constants**: https://physics.nist.gov/cuu/Constants/
2. **SI Units**: https://www.bipm.org/en/measurement-units
3. **Hyperphysics**: http://hyperphysics.phy-astr.gsu.edu/
4. **Physics Stack Exchange**: https://physics.stackexchange.com/
5. **ArXiv**: https://arxiv.org/ (for recent research)

## Reference

For complete constant values and common mistakes, see:
- [physical-constants.md](reference/physical-constants.md)
- [si-units.md](reference/si-units.md)
- [common-mistakes.md](reference/common-mistakes.md)
