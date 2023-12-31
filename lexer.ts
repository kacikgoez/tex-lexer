/**
 *  This is a (weak) LaTeX lexer / parser, I cannot guarantee that this works properly, I have never written a lexer / parser before 🤭.
 *  The project is based on the info found in https://www.bu.edu/math/files/2013/08/LongTeX1.pdf. It only is there to avoid basic
 *  errors, the more complicated stuff should be done through ChkTex (or whatever you want) on the server-side.
 *  You could turn ChkTex into Webassembly, however it is GPLv2 licensed and therefore not recommended if you don't want to
 *  share your frontend code. Feel free to contribute
 *  */

import { Parser } from "./classes/parser";


let lexer = new Parser(`\\documentclass{article}
\\usepackage{graphicx} % Required for inserting images
\\usepackage{pdfpages}
\\usepackage{amsmath, amssymb}
\\usepackage{parskip}
\\usepackage[a4paper,
            bindingoffset=0.2in,
            left=1in,
            right=1in,
            top=0.5in,
            bottom=1in,
            footskip=.25in]{geometry}
\\usepackage{}
\\usepackage{ stmaryrd }
\\newcommand*\\diff{\\mathop{}\\!\\mathrm{d}}
\\newcommand*\\sepline{\\vspace{0.5cm}\\hrule\\vspace{0.5cm}}
\\newcommand*\\quickint[2]{\\int_{#1}^{#2}}

\\title{SCML - Exercise 4}
\\date{April 2023}

\\begin{document}
\\maketitle
\\section{1 - MLE}
\\subsection{(a)} 
$$ p(x|\\mu,v) = \\binom{N}{n}\\theta^n(1-\\theta)^{N-n}$$

Given $m$ samples to estimate from, we have to maximize the likelihood:
$$ \\! $$
$$ L = \\prod_{m=1}^{M}{N \\choose n_m}\\theta^{n_m}(1-\\theta)^{N-n_m}$$
In order to achieve this, we take the logarithm of the likelihood function $L$:
$$ \\ln L = \\sum_{m=1}^M (\\ln N! - \\ln (n_m!-(N-n_m)!) + n_m \\cdot \\ln \\theta + (N-n_m) \\ln(1-\\theta) = $$
Since both N and n are given constants, we will not have to take the LHS into account when searching for the maximum $\\theta$. We only need to look at the RHS of the expression:
$$ \\sum_{m=1}^M  n_m \\ln \\theta + (N-n_m) \\ln(1-\\theta) $$
The only step left is maximizing the expression. In order to do this, we take the derivative w.r.t to $\\theta$ and set it to 0:
\\begin{align*}
    \\sum_{m=1}^M  n_m \\frac{1}{\\theta} - (N-n_m) \\frac{1}{(1-\\theta)} = 0 \\iff
    \\sum_{m=1}^M  \\frac{n_m}{\\theta} - \\frac{N - n_m}{(1-\\theta)} = 0 \\\\
    \\sum_{m=1}^M  \\frac{n_m-\\theta N}{\\theta\\left(-\\theta+1\\right)} = 0 \\iff
    \\sum_{m=1}^M  n_m-\\theta N = 0 \\\\
    \\sum_{m=1}^M  n_m - \\sum_{m=1}^M \\theta N = 
    \\sum_{m=1}^M  n_m - \\theta \\sum_{m=1}^M  N = 0 \\iff \\\\
    \\theta = \\frac{\\sum_{m=1}^M  n_m}{\\sum_{m=1}^M  N}
\\end{align*}  
\\newpage

\\subsection{(b)}

We estimate Maximum Likelihood {5} [5] for the Poisson distribution: 

$$p\\left( x \\right) = \\frac{{ \\lambda ^n}}{{n!}} e^{ - \\lambda } $$
Given m samples to estimate from, we have to maximize the likelihood:
$$ L = \\prod_{m=1}^{M} \\frac{{ \\lambda ^{n_m} }}{{n_m!}} e^{ - \\lambda } $$
In order to achieve this, we take the logarithm of the likelihood function $L$:
$$ \\ln L = \\sum_{m=1}^M n_m \\ln \\lambda - \\ln n_m! - \\lambda $$
Since $\\ln n_m!$ is a constant, we can throw it out again, the maxima will stay the same:
$$ \\ln \\hat{L} = \\sum_{m=1}^M n_m \\ln \\lambda - \\lambda $$
Now we take the derivative w.r.t $\\lambda$:
\\begin{align}
\\ln \\hat{L} ~d\\lambda = \\sum_{m=1}^M (n_m \\ln \\lambda - \\lambda) ~d\\lambda = \\sum_{m=1}^M (n_m \\frac{1}{\\lambda} - 1) =
\\end{align}
And finally, we set the derivative equal to 0:
\\begin{align}
\\sum_{m=1}^M (n_m \\frac{1}{\\lambda} - 1) =
\\frac{1}{\\lambda}\\sum_{m=1}^M n_m - M = 0 \\iff \\\\ 
\\frac{1}{\\lambda}\\sum_{m=1}^M n_m  = M \\iff \\\\
\\lambda = \\frac{1}{M}\\sum_{m=1}^M n_m
\\end{align}
\\newpage
\\section*{Exercise 2)}

We first calculate the parts that are shared between the subtasks.

The Gaussian Distribution as well as the log-likelihood:

\\begin{align*}
    \\mathcal{N}(x|\\mu_k, \\Sigma_k) &= \\frac{1}{\\sqrt{(2\\pi)^D \\det \\Sigma_k}}\\exp{\\left[-\\frac{1}{2}(x-\\mu_k)^T\\Sigma_k^{-1}(x-\\mu_k)\\right]} \\\\
    l(\\mu_k, \\Sigma_k|x_i) &= \\sum_{i=1}^m \\log \\left(\\frac{1}{(2\\pi)^{D/2} |\\Sigma_k|^{1/2}}\\exp{\\left[-\\frac{1}{2}(x_i-\\mu_k)^T\\Sigma_k^{-1}(x_i-\\mu_k)\\right]}\\right) \\\\
    &= \\sum_{i=1}^m \\log \\left(\\frac{1}{(2\\pi)^{D/2} |\\Sigma_k|^{1/2}}\\right) + \\sum_{i=1}^m \\left(\\log \\exp{\\left[-\\frac{1}{2}(x_i-\\mu_k)^T\\Sigma_k^{-1}(x_i-\\mu_k)\\right]}\\right) \\\\
    &= \\sum_{i=1}^m \\log \\left((2\\pi)^{-D/2} |\\Sigma_k|^{-1/2}\\right) + \\sum_{i=1}^m \\left(-\\frac{1}{2}(x_i-\\mu_k)^T\\Sigma_k^{-1}(x_i-\\mu_k)\\right) \\\\
    &= \\underbrace{\\sum_{i=1}^m -\\frac{D}{2} \\log \\left(2\\pi\\right)}_{\\text{constant}} + \\underbrace{\\sum_{i=1}^m -\\frac{1}{2} \\log \\left(|\\Sigma_k|\\right)}_{\\text{constant}} + \\sum_{i=1}^m \\left(-\\frac{1}{2}(x_i-\\mu_k)^T\\Sigma_k^{-1}(x_i-\\mu_k)\\right) \\\\
    &= -\\frac{mD}{2} \\log \\left(2\\pi\\right) -\\frac{m}{2} \\log \\left(|\\Sigma_k|\\right) -\\frac{1}{2} \\sum_{i=1}^m \\left((x_i-\\mu_k)^T\\Sigma_k^{-1}(x_i-\\mu_k)\\right) \\\\
\\end{align*}

$\\hat{\\mu}_k$ for each covariance matrix setup (using matrix identity (*): $\\frac{\\partial w^TAw}{\\partial w} = 2Aw$ if $A$ symmetric, $w$ independent of $A$, and (**): covariance matrices are positive definite by definition if the parameters are independent, hence always $> 0$, or never $=0$, respectively):

\\begin{align*}
    \\frac{\\partial}{\\partial \\mu} l(\\mu_k, \\Sigma_k|x_i) &= \\frac{\\partial}{\\partial \\mu_k} \\left( \\underbrace{-\\frac{mD}{2} \\log \\left(2\\pi\\right)-\\frac{m}{2} \\log \\left(|\\Sigma_k|\\right)}_{\\text{constant w.r.t. } \\mu_k} -\\frac{1}{2} \\sum_{i=1}^m \\left(\\underbrace{(x_i-\\mu_k)^T\\Sigma_k^{-1}(x_i-\\mu_k)}_{\\text{(*) with }w \\mapsto (x_i-\\mu_k); A \\mapsto \\Sigma^{-1}}\\right)\\right) \\overset{!}{=} 0 \\\\
    0 &= -\\frac{1}{2} \\sum_{i=1}^{m_k} 2 \\Sigma_k^{-1} (x_i-\\mu_k) \\\\
    &= - \\sum_{i=1}^{m_k} \\underbrace{\\Sigma_k^{-1}}_{\\text{(**)}} (x_i-\\mu_k) \\\\
    &= - \\sum_{i=1}^{m_k} x_i-\\mu_k \\\\
    &= m\\mu_k-\\sum_{i=1}^{m_k} x_i \\\\
    \\hat{\\mu_k} &= \\frac{\\sum_{i=1}^{m_k} x_i}{m_k}
\\end{align*}

The estimator $\\hat{\\mu_k}$ for $\\mu_k$ is independent of the covariance matrix apart from using the fact that covariance matrices are positive definite. It therefore does not matter if the covariance matrix is full, or sparse, or diagonal -- the estimator for $\\mu_k$ will be the same all the time.

\\subsection*{(a)}

\\begin{gather*}
\\text{Deriving w.r.t $\\Sigma_k$:} \\\\
\\frac{\\partial L}{\\partial (\\Sigma^{-1}_k)_{cd}} \\sum^{N_k}_{n=1} ( -\\frac{D}{2} \\log(2\\pi) - \\frac{1}{2} \\log(\\det(\\Sigma_k)) -\\frac{1}{2} \\sum^D_{c,d = 1}(x_{nkc}-\\mu_{kc})(\\Sigma_k^{-1})_{cd}(x_{nkd}-\\mu_{kd}) ) = \\\\
\\frac{\\partial L}{\\partial (\\Sigma^{-1}_k)_{cd}} \\sum^{N_k}_{n=1} ( -\\frac{D}{2} \\log(2\\pi) + \\frac{1}{2} \\log(\\det(\\Sigma_k^{-1})) -\\frac{1}{2} \\sum^D_{c,d = 1}(x_{nkc}-\\mu_{kc})(\\Sigma_k^{-1})_{cd}(x_{nkd}-\\mu_{kd}) ) = \\\\
\\sum^{N_k}_{n=1} (\\frac{1}{2} (\\Sigma_k)_{cd} -\\frac{1}{2} (x_{nkc}-\\mu_{kc})(x_{nkd}-\\mu_{kd}) ) = 0 \\iff \\\\
\\frac{1}{2} \\sum^{N_k}_{n=1} (\\Sigma_k)_{cd} - \\frac{1}{2} \\sum^{N_k}_{n=1} (x_{nkc}-\\mu_{kc})(x_{nkd}-\\mu_{kd}) = 0 \\iff \\\\
(\\Sigma_k)_{cd} = \\frac{1}{N_k} \\sum^{N_k}_{n=1} ((x_{nkc}-\\mu_{kc})(x_{nkd}-\\mu_{kd})) \\iff \\\\
\\Sigma_k = \\frac{1}{N_k} \\sum^{N_k}_{n=1} ((x_{nk}-\\mu_{k})^T(x_{nk}-\\mu_{k}))
\\end{gather*}

\\subsection*{(b)}
Deriving $\\mu$:
\\begin{gather*}
l(\\mu_k, \\Sigma_k) = \\sum^{N_k}_{n=1} \\log ( \\prod^{D}_{d=1} \\frac{1}{\\sqrt{(2\\pi) \\cdot \\sigma^2_{kd}}} \\cdot e^{-\\frac{1}{2}\\sum^D_{d=1}(\\frac{x_{nkd} - \\mu_{kd} }{\\sigma_{kd}})^2  }) = \\\\
    \\sum^{N_k}_{n=1}(-\\frac{D}{2} \\cdot \\log(2\\pi) - \\frac{1}{2} \\sum^D_{d=1}\\log(\\sigma_{kd}^2) - \\frac{1}{2} \\sum^D_{d=1}(\\frac{x_{nkd} - \\mu_{kd}}{\\sigma_{kd}})^2) = \\\\
    \\sum^{N_k}_{n=1}(-\\frac{D}{2} \\cdot \\log(2\\pi) - \\frac{1}{2} \\sum^D_{d=1}\\log(\\sigma_{kd}^2) - \\frac{1}{2} \\sum^D_{d=1}(\\frac{\\mu^2_{kd} - 2\\mu_{kd}x_{nkd} + x^2_{nkd}}{\\sigma^2_{kd}})  \\\\
    \\text{Deriving w.r.t $\\mu_k$:} \\\\
    \\frac{\\partial l}{\\partial \\mu_{kd}}  \\sum^{N_k}_{n=1}(- \\frac{1}{2} \\sum^D_{d=1}(\\frac{\\mu^2_{kd} - 2\\mu_{kd}x_{nkd} + x^2_{nkd}}{\\sigma^2_{kd}})) = 0 \\iff \\\\
    -\\frac{1}{2} \\sum^{N_k}_{n=1}(\\frac{2 \\mu_{kd} - 2x_{nkd}}{\\sigma^2_{kd}}) = 0 \\iff \\\\
    -\\frac{1}{2\\sigma^2_{kd}} \\sum^{N_k}_{n=1}(2 \\mu_{kd} - 2x_{nkd}) = 0 \\iff \\\\
    \\sum^{N_k}_{n=1}(2 \\mu_{kd} - 2x_{nkd}) = 0 \\iff \\\\
    N_k \\cdot \\mu_{kd} = \\sum^{N_k}_{k = 1} x_{nkd} \\iff \\mu_{kd} = \\frac{1}{N_k} \\sum^{N_k}_{k = 1} x_{nkd}
\\end{gather*}
Deriving $\\sigma^2_k$:
\\begin{gather*}
    \\sum^{N_k}_{n=1} (-\\frac{D}{2} \\cdot \\log(2\\pi) - \\frac{1}{2} \\sum^D_{d=1}\\log(\\sigma_{kd}^2) - \\frac{1}{2} \\sum^D_{d=1}(\\frac{x_{nkd} - \\mu_{kd}}{\\sigma_{kd}})^2) \\\\
    \\text{Derivative w.r.t $\\sigma^2_{kd}$:} \\\\
    \\frac{\\partial l}{\\partial \\sigma^2_{kd}} = \\sum^{N_k}_{n=1} (\\frac{1}{2 \\sigma^2_{kd}} - \\frac{(x_{nkd} - \\mu_{kd})^2}{2 \\sigma_{kd}^4}) = 0 \\iff \\\\
    \\frac{N_k}{2 \\sigma_{kd}^2} =\\sum^{N_k}_{n=1} \\frac{(x_{nkd} - \\mu_{kd})^2}{2 \\sigma_{kd}^4} \\iff \\\\
    N_k \\cdot \\sigma^2_{kd} = \\sum^{N_k}_{n=1}(x_{nkd} - \\mu_{kd})^2 \\iff \\\\
 \\sigma^2_{kd} = \\frac{1}{N_k} \\sum^{N_k}_{n=1}(x_{nkd} - \\mu_{kd})^2
\\end{gather*}
\\subsection*{(c)}

Deriving $\\mu$:

\\begin{align*}
    \\frac{\\partial}{\\partial \\mu} l(\\mu, \\Sigma|x_i) &= \\frac{\\partial}{\\partial \\mu} \\left( \\underbrace{-\\frac{N\\cdotD}{2} \\log \\left(2\\pi\\right)-\\frac{N}{2} \\log \\left(|\\Sigma|\\right)}_{\\text{constant w.r.t. } \\mu} -\\frac{1}{2} \\sum_{i=1}^N \\left((x_i-\\mu)^T\\Sigma^{-1}(x_i-\\mu)\\right)\\right) \\overset{!}{=} 0 \\\\
    0 &= -\\frac{1}{2} \\sum_{i=1}^N 2 \\Sigma^{-1} (x_i-\\mu) \\\\
    &= - \\sum_{i=1}^N \\Sigma^{-1} (x_i-\\mu) \\\\
    &= - \\sum_{i=1}^N x_i-\\mu \\\\
    &= N\\mu-\\sum_{i=1}^N x_i \\\\
    \\hat{\\mu} &= \\frac{\\sum_{i=1}^N x_i}{N}
\\end{align*}

Deriving $\\Sigma$:

\\begin{align*}
    \\frac{\\partial}{\\partial \\Sigma^{-1}} l(\\mu, \\Sigma|x_i) &= \\frac{\\partial}{\\partial \\Sigma^{-1}} \\left( \\underbrace{-\\frac{N\\cdotD}{2} \\log \\left(2\\pi\\right)}_{\\text{constant w.r.t. } \\Sigma}-\\frac{N}{2} \\log \\left(|\\Sigma| \\right) -\\frac{1}{2} \\sum_{i=1}^N \\left((x_i-\\mu)^T\\Sigma^{-1}(x_i-\\mu)\\right)\\right) \\overset{!}{=} 0 \\\\
    &= \\frac{\\partial}{\\partial \\Sigma^{-1}} \\left(\\frac{N}{2} \\log \\left(|\\Sigma^{-1}| \\right) -\\frac{1}{2} \\sum_{i=1}^N \\left((x_i-\\mu)^T\\Sigma^{-1}(x_i-\\mu)\\right)\\right) \\overset{!}{=} 0 \\\\
    0 &= \\frac{1}{2}N \\cdot \\Sigma - \\frac{1}{2} \\sum_{i=1}^N \\left((x_i-\\mu)(x_i-\\mu)^T\\right) \\\\
    m \\cdot \\Sigma &= \\sum_{i=1}^N \\left((x_i-\\mu)(x_i-\\mu)^T\\right) \\\\
    \\hat{\\Sigma} &= \\frac{1}{N} \\sum_{i=1}^N \\left((x_i-\\mu)(x_i-\\mu)^T\\right)\\\\
\\end{align*}

\\subsection*{(d)}
Deriving $\\mu$:
\\begin{align*}
l(\\mu, \\Sigma) &= \\sum^{N}_{n=1} \\log \\left( \\prod^{D}_{d=1} \\frac{1}{\\sqrt{(2\\pi) \\cdot \\sigma^2_{d}}} \\cdot \\exp\\left[-\\frac{1}{2}\\sum^D_{d=1}(\\frac{x_{nd} - \\mu_{d} }{\\sigma_{d}})^2\\right] \\right)\\\\
    &= \\sum^{N}_{n=1}\\left(-\\frac{D}{2} \\cdot \\log(2\\pi) - \\frac{1}{2} \\sum^D_{d=1}\\log(\\sigma_{d}^2) - \\frac{1}{2} \\sum^D_{d=1}(\\frac{x_{nd} - \\mu_{d}}{\\sigma_{d}})^2\\right)\\\\
    &= \\sum^{N}_{n=1}\\left(-\\frac{D}{2} \\cdot \\log(2\\pi) - \\frac{1}{2} \\sum^D_{d=1}\\log(\\sigma_{d}^2) - \\frac{1}{2} \\sum^D_{d=1}(\\frac{\\mu^2_{d} - 2\\mu_{d}x_{nd} + x^2_{nd}}{\\sigma^2_{d}})\\right) \\\\
    \\frac{\\partial l(\\mu, \\Sigma)}{\\partial \\mu_{d}} &= \\frac{\\partial l}{\\partial \\mu_{d}} \\left( \\sum^{N}_{n=1}\\left(- \\frac{1}{2} \\sum^D_{d=1}\\frac{\\mu^2_{d} - 2\\mu_{d}x_{nd} + x^2_{nd}}{\\sigma^2_{d}}\\right)\\right) \\overset{!}{=} 0 \\\\
    0 &= -\\frac{1}{2} \\sum^{N}_{n=1}\\left(\\frac{2 \\mu_{d} - 2x_{nd}}{\\sigma^2_{d}}\\right) \\\\
    &= \\underbrace{-2\\cdot \\frac{1}{2\\sigma^2_{d}}}_{\\ne 0} \\sum^{N}_{n=1}(\\mu_{d} - x_{nd}) \\\\
    &= \\sum^{N}_{n=1}(\\mu_{d} - x_{nd}) \\\\
    N \\cdot \\mu_{d} &= \\sum^{N}_{k = 1} x_{nd} \\\\
    \\mu_{d} &= \\frac{1}{N} \\sum^{N}_{k = 1} x_{nd}
\\end{align*}

Deriving $\\sigma^2$:
\\begin{align*}
    \\frac{\\partial l(\\mu, \\Sigma)}{\\partial \\sigma^2_{d}} &= \\frac{\\partial l}{\\partial \\sigma^2_{d}}\\left(\\sum^{N}_{n=1} \\left(-\\frac{D}{2} \\cdot \\log(2\\pi) - \\frac{1}{2} \\sum^D_{d=1}\\log(\\sigma_{d}^2) - \\frac{1}{2} \\sum^D_{d=1}\\left(\\frac{x_{nd} - \\mu_{d}}{\\sigma_{d}}\\right)^2\\right)\\right) \\\\
    &= \\sum^{N}_{n=1} \\left(\\frac{1}{2 \\sigma^2_{d}} - \\frac{(x_{nd} - \\mu_{d})^2}{2 \\sigma_{d}^4}\\right) \\overset{!}{=} 0 \\\\
    N \\cdot \\frac{1}{2 \\sigma^2_{d}} &= \\sum^{N}_{n=1} \\frac{(x_{nd} - \\mu_{d})^2}{2 \\sigma_{d}^4} = \\frac{1}{2 \\sigma_{d}^4}\\sum^{N}_{n=1} (x_{nd} - \\mu_{d})^2\\\\
    N \\cdot \\sigma^2_{d} &= \\sum^{N}_{n=1}(x_{nd} - \\mu_{d})^2 \\\\
 \\sigma^2_{d} &= \\frac{1}{N} \\sum^{N}_{n=1}(x_{nd} - \\mu_{d})^2
\\end{align*}
\\newpage
\\section*{Exercise 3)}

Summarize the task:

\\begin{align*}
    p(k|\\theta) &= \\theta^{\\delta_{k,1}}\\cdot(1-\\theta)^{\\delta_{k,2}} \\\\
    p(x|k) &= \\mathcal{N}(x|\\mu_k, \\Sigma_k) = \\frac{1}{(2\\pi)^{D/2}|\\Sigma_k|^{1/2}}\\exp \\left(-\\frac{1}{2}\\left(x-\\mu_k\\right)^T\\Sigma_k^{-1}(x-\\mu_k)\\right) \\\\
    p(\\mu_k|k) &= \\mathcal{N}(\\mu_k|\\mu_{k,0}, \\Sigma_{k,0}) = \\frac{1}{(2\\pi)^{D/2}|\\Sigma_{k,0}|^{1/2}}\\exp \\left(-\\frac{1}{2}\\left(\\mu_k-\\mu_{k,0}\\right)^T\\Sigma_{k,0}^{-1}(\\mu_k-\\mu_{k,0})\\right)
\\end{align*}

\\subsection*{(a)}

Covariance matrices are diagonal, non-pooled. Class conditional now given with $\\Sigma_k = \\lambda \\Sigma_{k,0}$ as 

\\begin{align*}
    p(x|k) &= \\mathcal{N}(x|\\mu_k, \\lambda\\Sigma_{k,0}) = \\frac{1}{(2\\pi)^{D/2}|\\lambda\\Sigma_{k,0}|^{1/2}}\\exp \\left(-\\frac{\\lambda}{2}\\left(x-\\mu_k\\right)^T\\Sigma_{k,0}^{-1}(x-\\mu_k)\\right) \\\\
\\end{align*}

From the lecture we take the univariate Gaussian example and adapt it to the multivariate case. 

\\begin{align*}
    p(\\mu_k|x_1,\\dots, x_D) &= const(\\mu_k) \\cdot p(\\mu_k|\\mu_{k,0},\\Sigma_{k,0})\\cdot \\prod_{n=1}^{D}p(x_n|\\mu_k,\\lambda\\Sigma_{k,0}) \\\\
    &= const_{new}(\\mu_k) \\cdot \\exp\\left(-\\frac{1}{2}\\left(\\mu_k-\\mu_{k,0}\\right)^T\\Sigma_{k,0}^{-1}(\\mu_k-\\mu_{k,0})\\right) \\cdot \\prod_{n=1}^{D} \\exp \\left(-\\frac{\\lambda}{2}\\left(x_n-\\mu_k\\right)^T\\Sigma_{k,0}^{-1}(x_n-\\mu_k)\\right) \\\\
    &= const_{new}(\\mu_k) \\cdot \\exp\\left(-\\frac{1}{2}\\left(\\mu_k-\\mu_{k,0}\\right)^T\\Sigma_{k,0}^{-1}(\\mu_k-\\mu_{k,0})\\right) \\cdot \\exp \\left(-\\frac{\\lambda}{2}\\sum_{n=1}^{D}\\left(x_n-\\mu_k\\right)^T\\Sigma_{k,0}^{-1}(x_n-\\mu_k)\\right) \\\\
    &= const_{new}(\\mu_k) \\cdot \\exp\\left(-\\frac{1}{2}\\left(\\mu_k-\\mu_{k,0}\\right)^T\\Sigma_{k,0}^{-1}(\\mu_k-\\mu_{k,0})-\\frac{\\lambda}{2}\\sum_{n=1}^{D}\\left(x_n-\\mu_k\\right)^T\\Sigma_{k,0}^{-1}(x_n-\\mu_k)\\right) \\\\
    &= const_{new}(\\mu_k) \\cdot \\exp\\left(-\\frac{1}{2}\\left(\\left(\\mu_k-\\mu_{k,0}\\right)^T\\Sigma_{k,0}^{-1}(\\mu_k-\\mu_{k,0})+\\lambda\\sum_{n=1}^{D}\\left(x_n-\\mu_k\\right)^T\\Sigma_{k,0}^{-1}(x_n-\\mu_k)\\right)\\right) \\\\
\\end{align*}

According to the hint, we can now split the computation between $k=1$ and $k=2$. We can therefore omit the class label $k$, since the computation will be the same for both cases and just incurs different values.

\\begin{align*}
    &= const_{new}(\\mu) \\cdot \\exp\\left(-\\frac{1}{2}\\left(\\left(\\mu-\\mu_{0}\\right)^T\\Sigma_{0}^{-1}(\\mu-\\mu_{0})+\\lambda\\sum_{n=1}^{D}\\left(x_n-\\mu\\right)^T\\Sigma_{0}^{-1}(x_n-\\mu)\\right)\\right) \\\\
    &= const_{new}(\\mu) \\cdot \\exp\\left(-\\frac{1}{2}\\left(\\left(\\mu-\\mu_{0}\\right)^T\\Sigma_{0}^{-1}(\\mu-\\mu_{0})+\\lambda\\sum_{n=1}^{D}\\left(\\mu-x_n\\right)^T\\Sigma_{0}^{-1}(\\mu-x_n)\\right)\\right) \\\\
\\end{align*}

Apart from the constant scaling term, this is the formula of a Gaussian distributed with parameters $\\mu_N := \\mu_0+\\lambda\\sum_{n=1}^Dx_n$ and $\\Sigma_N := \\Sigma_0$, therefore $p(\\mu | x_1, \\dots, x_D) \\sim \\mathcal{N}\\left(\\mu_0+\\lambda\\sum_{n=1}^Dx_n, \\Sigma_0\\right)$.

\\begin{align*}
    p(\\mu | x_1, \\dots, x_D) &= const(\\mu_N) \\cdot \\exp\\left(-\\frac{1}{2}\\left(\\mu - \\left(\\mu_0+\\lambda\\sum_{n=1}^Dx_n\\right)\\right)^T\\Sigma_0^{-1}\\left(\\mu - \\left(\\mu_0+\\lambda\\sum_{n=1}^Dx_n\\right)\\right)\\right) \\\\
    &= const(\\mu_N) \\cdot \\exp\\left(-\\frac{1}{2}\\left(\\mu - \\mu_N\\right)^T\\Sigma_0^{-1}\\left(\\mu - \\mu_N\\right)\\right) \\\\
    &= \\frac{1}{(2\\pi)^{D/2}\\cdot |\\Sigma_N|^{1/2}} \\exp\\left(-\\frac{1}{2}\\left(\\mu - \\mu_N\\right)^T\\Sigma_0^{-1}\\left(\\mu - \\mu_N\\right)\\right) \\\\
\\end{align*}

From ML estimation we know $\\mu = \\frac{1}{n}\\sum_{i=1}^Dx_i$ and compare the coefficients. We have $D$ samples plus $\\lambda$ new training samples. Hence $n \\mapsto D+\\lambda$. For the $x_i$'s, they are split between the $D$ samples we already have plus the training samples $\\lambda$, which are accounted for with the base mean. The $D$ samples consist of $k$ classes, each of which have $N_k$ samples. According to the hint, we solve the problem independent of the classes:

\\begin{align*}
    \\hat{\\mu}_k^{\\text{MAP}} = \\frac{1}{N_k + \\lambda} \\left(\\lambda\\mu_{k,0} + \\sum_{n=1}^{N_k}x_n\\right)
\\end{align*}

\\subsection*{(b)}

Since variances are greater or equal to zero, there are four options for the relationship between $\\sigma_{k,d}^2$ and $\\sigma_{k,0,d}^2$ and therefore for the ratio of $\\frac{\\sigma_{k,d}^2}{\\sigma_{k,0,d}^2}$.

\\begin{itemize}
    \\item $\\sigma_{k,d}^2 > \\sigma_{k,0,d}^2$, $\\sigma_{k,0,d}^2 \\ne 0 \\Rightarrow \\frac{\\sigma_{k,d}^2}{\\sigma_{k,0,d}^2} > 1$: The old variance is smaller than the new one. The resulting surface would be smoother. $\\hat{\\mu}_k^{\\text{MAP}}$ would shift accordingly. For training, more uncertainty would get involved. For initial monitoring, the uncertainty would be smaller than after training.
    \\item $\\sigma_{k,d}^2 < \\sigma_{k,0,d}^2 \\Rightarrow \\frac{\\sigma_{k,d}^2}{\\sigma_{k,0,d}^2} \\in [0,1]$: The old variance is greater than the new one. $\\hat{\\mu}_k^{\\text{MAP}}$ would shift according to the new variance and the surface would have a higher peak. For training, the uncertainty would become smaller. For initial monitoring, the uncertainty would have been larger than after the training procedure. 
    \\item $\\sigma_{k,d}^2 = \\sigma_{k,0,d}^2 \\Rightarrow \\frac{\\sigma_{k,d}^2}{\\sigma_{k,0,d}^2} = 1$: Nothing changes, the weight of the new sample is the same as the weight for every other sample that has already been there. For initial monitoring, the new sample fits in the region of the other ones, there are similarly distributed. For training, the sample adds to the number of other ones, yet does not introduce a shift in the distribution. Therefore the new sample must be located at the mean, and $\\hat{\\mu}_k^{\\text{MAP}}$ would not change.
    \\item If the denominator $\\sigma_{k,0,d}^2 = 0$: A variance like this can only occur if we had exactly one sample at the start. Initial monitoring therefore would be difficult (since our point cloud only consists of one sample). For training and adding another sample, the initial sample would get a weight of 50\\% with the additional training sample getting another 50\\%, which might make the resulting estimator quite biased. 
\\end{itemize}


\\subsection*{(c)}

We use the formulas from the lecture.

\\begin{align*}
    \\hat{\\mu}_k^{Mean} = \\int \\mu_k \\cdot p(\\mu_k | x_1, \\dots, x_D) d\\mu_k \\\\
    \\hat{\\mu}_k^{Median} = \\int |\\mu_k-\\Tilde{\\mu}_k| p(\\mu_k | x_1, \\dots, x_D) d\\mu_k
\\end{align*}

Mean:

\\begin{align*}
    \\hat{\\mu}_k^{Mean} &= \\int \\mu_k \\cdot p(\\mu_k | x_1, \\dots, x_D) d\\mu_k \\\\
    &= \\int \\mu_k \\cdot \\frac{\\overbrace{p(x_1, \\dots, x_D|\\mu_k)}^{\\mu_k \\text{ independent of data}} \\cdot \\overbrace{p(\\mu_k)}^{\\text{constant}}}{p(x_1, \\dots, x_D)} d\\mu_k \\\\
    &= \\int \\mu_k \\cdot \\frac{p(x_1, \\dots, x_D)}{p(x_1, \\dots, x_D)} \\cdot p(\\mu_k) d\\mu_k \\\\
    &= \\int \\mu_k \\cdot p(\\mu_k) d\\mu_k \\\\
    &= \\frac{p(\\mu_k)}{2}\\mu_k^2 \\text{ (+ const)}\\\\
\\end{align*}

Median:

\\begin{align*}
    \\hat{\\mu}_k^{Median} &= \\int |\\mu_k-\\Tilde{\\mu}_k| p(\\mu_k | x_1, \\dots, x_D) d\\mu_k \\\\
    &= \\int |\\mu_k-\\Tilde{\\mu}_k| \\frac{p(x_1, \\dots, x_D | \\mu_k) \\cdot p(\\mu_k)}{p(x_1, \\dots, x_D)} d\\mu_k \\\\
    &= \\int |\\mu_k-\\Tilde{\\mu}_k| \\frac{p(x_1, \\dots, x_D) \\cdot p(\\mu_k)}{p(x_1, \\dots, x_D)} d\\mu_k \\\\
    &= \\int |\\mu_k-\\Tilde{\\mu}_k| p(\\mu_k) d\\mu_k \\\\
    &= p(\\mu_k) \\frac{(\\mu_k -\\Tilde{\\mu}_k)|\\mu_k-\\Tilde{\\mu}_k|}{2} \\text{ (+ const)} & \\text{(might be discontinuous)} \\\\
\\end{align*}


\\end{document}
\\documentclass{article}
\\usepackage{graphicx} % Required for inserting images
\\usepackage{pdfpages}
\\usepackage{amsmath, amssymb}
\\usepackage{parskip}
\\usepackage[a4paper,
            bindingoffset=0.2in,
            left=1in,
            right=1in,
            top=0.5in,
            bottom=1in,
            footskip=.25in]{geometry}
\\usepackage{}
\\usepackage{ stmaryrd }
\\newcommand*\\diff{\\mathop{}\\!\\mathrm{d}}
\\newcommand*\\sepline{\\vspace{0.5cm}\\hrule\\vspace{0.5cm}}
\\newcommand*\\quickint[2]{\\int_{#1}^{#2}}

\\title{SCML - Exercise 4}
\\date{April 2023}

\\begin{document}
\\maketitle
\\section{1 - MLE}
\\subsection{(a)} 
$$ p(x|\\mu,v) = \\binom{N}{n}\\theta^n(1-\\theta)^{N-n}$$

Given $m$ samples to estimate from, we have to maximize the likelihood:
$$ \\! $$
$$ L = \\prod_{m=1}^{M}{N \\choose n_m}\\theta^{n_m}(1-\\theta)^{N-n_m}$$
In order to achieve this, we take the logarithm of the likelihood function $L$:
$$ \\ln L = \\sum_{m=1}^M (\\ln N! - \\ln (n_m!-(N-n_m)!) + n_m \\cdot \\ln \\theta + (N-n_m) \\ln(1-\\theta) = $$
Since both N and n are given constants, we will not have to take the LHS into account when searching for the maximum $\\theta$. We only need to look at the RHS of the expression:
$$ \\sum_{m=1}^M  n_m \\ln \\theta + (N-n_m) \\ln(1-\\theta) $$
The only step left is maximizing the expression. In order to do this, we take the derivative w.r.t to $\\theta$ and set it to 0:
\\begin{align*}
    \\sum_{m=1}^M  n_m \\frac{1}{\\theta} - (N-n_m) \\frac{1}{(1-\\theta)} = 0 \\iff
    \\sum_{m=1}^M  \\frac{n_m}{\\theta} - \\frac{N - n_m}{(1-\\theta)} = 0 \\\\
    \\sum_{m=1}^M  \\frac{n_m-\\theta N}{\\theta\\left(-\\theta+1\\right)} = 0 \\iff
    \\sum_{m=1}^M  n_m-\\theta N = 0 \\\\
    \\sum_{m=1}^M  n_m - \\sum_{m=1}^M \\theta N = 
    \\sum_{m=1}^M  n_m - \\theta \\sum_{m=1}^M  N = 0 \\iff \\\\
    \\theta = \\frac{\\sum_{m=1}^M  n_m}{\\sum_{m=1}^M  N}
\\end{align*}  
\\newpage

\\subsection{(b)}

We estimate Maximum Likelihood {5} [5] for the Poisson distribution:

$$p\\left( x \\right) = \\frac{{ \\lambda ^n}}{{n!}} e^{ - \\lambda } $$
Given m samples to estimate from, we have to maximize the likelihood:
$$ L = \\prod_{m=1}^{M} \\frac{{ \\lambda ^{n_m} }}{{n_m!}} e^{ - \\lambda } $$
In order to achieve this, we take the logarithm of the likelihood function $L$:
$$ \\ln L = \\sum_{m=1}^M n_m \\ln \\lambda - \\ln n_m! - \\lambda $$
Since $\\ln n_m!$ is a constant, we can throw it out again, the maxima will stay the same:
$$ \\ln \\hat{L} = \\sum_{m=1}^M n_m \\ln \\lambda - \\lambda $$
Now we take the derivative w.r.t $\\lambda$:
\\begin{align}
\\ln \\hat{L} ~d\\lambda = \\sum_{m=1}^M (n_m \\ln \\lambda - \\lambda) ~d\\lambda = \\sum_{m=1}^M (n_m \\frac{1}{\\lambda} - 1) =
\\end{align}
And finally, we set the derivative equal to 0:
\\begin{align}
\\sum_{m=1}^M (n_m \\frac{1}{\\lambda} - 1) =
\\frac{1}{\\lambda}\\sum_{m=1}^M n_m - M = 0 \\iff \\\\ 
\\frac{1}{\\lambda}\\sum_{m=1}^M n_m  = M \\iff \\\\
\\lambda = \\frac{1}{M}\\sum_{m=1}^M n_m
\\end{align}
\\newpage
\\section*{Exercise 2)}

We first calculate the parts that are shared between the subtasks.

The Gaussian Distribution as well as the log-likelihood:

\\begin{align*}
    \\mathcal{N}(x|\\mu_k, \\Sigma_k) &= \\frac{1}{\\sqrt{(2\\pi)^D \\det \\Sigma_k}}\\exp{\\left[-\\frac{1}{2}(x-\\mu_k)^T\\Sigma_k^{-1}(x-\\mu_k)\\right]} \\\\
    l(\\mu_k, \\Sigma_k|x_i) &= \\sum_{i=1}^m \\log \\left(\\frac{1}{(2\\pi)^{D/2} |\\Sigma_k|^{1/2}}\\exp{\\left[-\\frac{1}{2}(x_i-\\mu_k)^T\\Sigma_k^{-1}(x_i-\\mu_k)\\right]}\\right) \\\\
    &= \\sum_{i=1}^m \\log \\left(\\frac{1}{(2\\pi)^{D/2} |\\Sigma_k|^{1/2}}\\right) + \\sum_{i=1}^m \\left(\\log \\exp{\\left[-\\frac{1}{2}(x_i-\\mu_k)^T\\Sigma_k^{-1}(x_i-\\mu_k)\\right]}\\right) \\\\
    &= \\sum_{i=1}^m \\log \\left((2\\pi)^{-D/2} |\\Sigma_k|^{-1/2}\\right) + \\sum_{i=1}^m \\left(-\\frac{1}{2}(x_i-\\mu_k)^T\\Sigma_k^{-1}(x_i-\\mu_k)\\right) \\\\
    &= \\underbrace{\\sum_{i=1}^m -\\frac{D}{2} \\log \\left(2\\pi\\right)}_{\\text{constant}} + \\underbrace{\\sum_{i=1}^m -\\frac{1}{2} \\log \\left(|\\Sigma_k|\\right)}_{\\text{constant}} + \\sum_{i=1}^m \\left(-\\frac{1}{2}(x_i-\\mu_k)^T\\Sigma_k^{-1}(x_i-\\mu_k)\\right) \\\\
    &= -\\frac{mD}{2} \\log \\left(2\\pi\\right) -\\frac{m}{2} \\log \\left(|\\Sigma_k|\\right) -\\frac{1}{2} \\sum_{i=1}^m \\left((x_i-\\mu_k)^T\\Sigma_k^{-1}(x_i-\\mu_k)\\right) \\\\
\\end{align*}

$\\hat{\\mu}_k$ for each covariance matrix setup (using matrix identity (*): $\\frac{\\partial w^TAw}{\\partial w} = 2Aw$ if $A$ symmetric, $w$ independent of $A$, and (**): covariance matrices are positive definite by definition if the parameters are independent, hence always $> 0$, or never $=0$, respectively):

\\begin{align*}
    \\frac{\\partial}{\\partial \\mu} l(\\mu_k, \\Sigma_k|x_i) &= \\frac{\\partial}{\\partial \\mu_k} \\left( \\underbrace{-\\frac{mD}{2} \\log \\left(2\\pi\\right)-\\frac{m}{2} \\log \\left(|\\Sigma_k|\\right)}_{\\text{constant w.r.t. } \\mu_k} -\\frac{1}{2} \\sum_{i=1}^m \\left(\\underbrace{(x_i-\\mu_k)^T\\Sigma_k^{-1}(x_i-\\mu_k)}_{\\text{(*) with }w \\mapsto (x_i-\\mu_k); A \\mapsto \\Sigma^{-1}}\\right)\\right) \\overset{!}{=} 0 \\\\
    0 &= -\\frac{1}{2} \\sum_{i=1}^{m_k} 2 \\Sigma_k^{-1} (x_i-\\mu_k) \\\\
    &= - \\sum_{i=1}^{m_k} \\underbrace{\\Sigma_k^{-1}}_{\\text{(**)}} (x_i-\\mu_k) \\\\
    &= - \\sum_{i=1}^{m_k} x_i-\\mu_k \\\\
    &= m\\mu_k-\\sum_{i=1}^{m_k} x_i \\\\
    \\hat{\\mu_k} &= \\frac{\\sum_{i=1}^{m_k} x_i}{m_k}
\\end{align*}

The estimator $\\hat{\\mu_k}$ for $\\mu_k$ is independent of the covariance matrix apart from using the fact that covariance matrices are positive definite. It therefore does not matter if the covariance matrix is full, or sparse, or diagonal -- the estimator for $\\mu_k$ will be the same all the time.

\\subsection*{(a)}

\\begin{gather*}
\\text{Deriving w.r.t $\\Sigma_k$:} \\\\
\\frac{\\partial L}{\\partial (\\Sigma^{-1}_k)_{cd}} \\sum^{N_k}_{n=1} ( -\\frac{D}{2} \\log(2\\pi) - \\frac{1}{2} \\log(\\det(\\Sigma_k)) -\\frac{1}{2} \\sum^D_{c,d = 1}(x_{nkc}-\\mu_{kc})(\\Sigma_k^{-1})_{cd}(x_{nkd}-\\mu_{kd}) ) = \\\\
\\frac{\\partial L}{\\partial (\\Sigma^{-1}_k)_{cd}} \\sum^{N_k}_{n=1} ( -\\frac{D}{2} \\log(2\\pi) + \\frac{1}{2} \\log(\\det(\\Sigma_k^{-1})) -\\frac{1}{2} \\sum^D_{c,d = 1}(x_{nkc}-\\mu_{kc})(\\Sigma_k^{-1})_{cd}(x_{nkd}-\\mu_{kd}) ) = \\\\
\\sum^{N_k}_{n=1} (\\frac{1}{2} (\\Sigma_k)_{cd} -\\frac{1}{2} (x_{nkc}-\\mu_{kc})(x_{nkd}-\\mu_{kd}) ) = 0 \\iff \\\\
\\frac{1}{2} \\sum^{N_k}_{n=1} (\\Sigma_k)_{cd} - \\frac{1}{2} \\sum^{N_k}_{n=1} (x_{nkc}-\\mu_{kc})(x_{nkd}-\\mu_{kd}) = 0 \\iff \\\\
(\\Sigma_k)_{cd} = \\frac{1}{N_k} \\sum^{N_k}_{n=1} ((x_{nkc}-\\mu_{kc})(x_{nkd}-\\mu_{kd})) \\iff \\\\
\\Sigma_k = \\frac{1}{N_k} \\sum^{N_k}_{n=1} ((x_{nk}-\\mu_{k})^T(x_{nk}-\\mu_{k}))
\\end{gather*}

\\subsection*{(b)}
Deriving $\\mu$:
\\begin{gather*}
l(\\mu_k, \\Sigma_k) = \\sum^{N_k}_{n=1} \\log ( \\prod^{D}_{d=1} \\frac{1}{\\sqrt{(2\\pi) \\cdot \\sigma^2_{kd}}} \\cdot e^{-\\frac{1}{2}\\sum^D_{d=1}(\\frac{x_{nkd} - \\mu_{kd} }{\\sigma_{kd}})^2  }) = \\\\
    \\sum^{N_k}_{n=1}(-\\frac{D}{2} \\cdot \\log(2\\pi) - \\frac{1}{2} \\sum^D_{d=1}\\log(\\sigma_{kd}^2) - \\frac{1}{2} \\sum^D_{d=1}(\\frac{x_{nkd} - \\mu_{kd}}{\\sigma_{kd}})^2) = \\\\
    \\sum^{N_k}_{n=1}(-\\frac{D}{2} \\cdot \\log(2\\pi) - \\frac{1}{2} \\sum^D_{d=1}\\log(\\sigma_{kd}^2) - \\frac{1}{2} \\sum^D_{d=1}(\\frac{\\mu^2_{kd} - 2\\mu_{kd}x_{nkd} + x^2_{nkd}}{\\sigma^2_{kd}})  \\\\
    \\text{Deriving w.r.t $\\mu_k$:} \\\\
    \\frac{\\partial l}{\\partial \\mu_{kd}}  \\sum^{N_k}_{n=1}(- \\frac{1}{2} \\sum^D_{d=1}(\\frac{\\mu^2_{kd} - 2\\mu_{kd}x_{nkd} + x^2_{nkd}}{\\sigma^2_{kd}})) = 0 \\iff \\\\
    -\\frac{1}{2} \\sum^{N_k}_{n=1}(\\frac{2 \\mu_{kd} - 2x_{nkd}}{\\sigma^2_{kd}}) = 0 \\iff \\\\
    -\\frac{1}{2\\sigma^2_{kd}} \\sum^{N_k}_{n=1}(2 \\mu_{kd} - 2x_{nkd}) = 0 \\iff \\\\
    \\sum^{N_k}_{n=1}(2 \\mu_{kd} - 2x_{nkd}) = 0 \\iff \\\\
    N_k \\cdot \\mu_{kd} = \\sum^{N_k}_{k = 1} x_{nkd} \\iff \\mu_{kd} = \\frac{1}{N_k} \\sum^{N_k}_{k = 1} x_{nkd}
\\end{gather*}
Deriving $\\sigma^2_k$:
\\begin{gather*}
    \\sum^{N_k}_{n=1} (-\\frac{D}{2} \\cdot \\log(2\\pi) - \\frac{1}{2} \\sum^D_{d=1}\\log(\\sigma_{kd}^2) - \\frac{1}{2} \\sum^D_{d=1}(\\frac{x_{nkd} - \\mu_{kd}}{\\sigma_{kd}})^2) \\\\
    \\text{Derivative w.r.t $\\sigma^2_{kd}$:} \\\\
    \\frac{\\partial l}{\\partial \\sigma^2_{kd}} = \\sum^{N_k}_{n=1} (\\frac{1}{2 \\sigma^2_{kd}} - \\frac{(x_{nkd} - \\mu_{kd})^2}{2 \\sigma_{kd}^4}) = 0 \\iff \\\\
    \\frac{N_k}{2 \\sigma_{kd}^2} =\\sum^{N_k}_{n=1} \\frac{(x_{nkd} - \\mu_{kd})^2}{2 \\sigma_{kd}^4} \\iff \\\\
    N_k \\cdot \\sigma^2_{kd} = \\sum^{N_k}_{n=1}(x_{nkd} - \\mu_{kd})^2 \\iff \\\\
 \\sigma^2_{kd} = \\frac{1}{N_k} \\sum^{N_k}_{n=1}(x_{nkd} - \\mu_{kd})^2
\\end{gather*}
\\subsection*{(c)}

Deriving $\\mu$:

\\begin{align*}
    \\frac{\\partial}{\\partial \\mu} l(\\mu, \\Sigma|x_i) &= \\frac{\\partial}{\\partial \\mu} \\left( \\underbrace{-\\frac{N\\cdotD}{2} \\log \\left(2\\pi\\right)-\\frac{N}{2} \\log \\left(|\\Sigma|\\right)}_{\\text{constant w.r.t. } \\mu} -\\frac{1}{2} \\sum_{i=1}^N \\left((x_i-\\mu)^T\\Sigma^{-1}(x_i-\\mu)\\right)\\right) \\overset{!}{=} 0 \\\\
    0 &= -\\frac{1}{2} \\sum_{i=1}^N 2 \\Sigma^{-1} (x_i-\\mu) \\\\
    &= - \\sum_{i=1}^N \\Sigma^{-1} (x_i-\\mu) \\\\
    &= - \\sum_{i=1}^N x_i-\\mu \\\\
    &= N\\mu-\\sum_{i=1}^N x_i \\\\
    \\hat{\\mu} &= \\frac{\\sum_{i=1}^N x_i}{N}
\\end{align*}

Deriving $\\Sigma$:

\\begin{align*}
    \\frac{\\partial}{\\partial \\Sigma^{-1}} l(\\mu, \\Sigma|x_i) &= \\frac{\\partial}{\\partial \\Sigma^{-1}} \\left( \\underbrace{-\\frac{N\\cdotD}{2} \\log \\left(2\\pi\\right)}_{\\text{constant w.r.t. } \\Sigma}-\\frac{N}{2} \\log \\left(|\\Sigma| \\right) -\\frac{1}{2} \\sum_{i=1}^N \\left((x_i-\\mu)^T\\Sigma^{-1}(x_i-\\mu)\\right)\\right) \\overset{!}{=} 0 \\\\
    &= \\frac{\\partial}{\\partial \\Sigma^{-1}} \\left(\\frac{N}{2} \\log \\left(|\\Sigma^{-1}| \\right) -\\frac{1}{2} \\sum_{i=1}^N \\left((x_i-\\mu)^T\\Sigma^{-1}(x_i-\\mu)\\right)\\right) \\overset{!}{=} 0 \\\\
    0 &= \\frac{1}{2}N \\cdot \\Sigma - \\frac{1}{2} \\sum_{i=1}^N \\left((x_i-\\mu)(x_i-\\mu)^T\\right) \\\\
    m \\cdot \\Sigma &= \\sum_{i=1}^N \\left((x_i-\\mu)(x_i-\\mu)^T\\right) \\\\
    \\hat{\\Sigma} &= \\frac{1}{N} \\sum_{i=1}^N \\left((x_i-\\mu)(x_i-\\mu)^T\\right)\\\\
\\end{align*}

\\subsection*{(d)}
Deriving $\\mu$:
\\begin{align*}
l(\\mu, \\Sigma) &= \\sum^{N}_{n=1} \\log \\left( \\prod^{D}_{d=1} \\frac{1}{\\sqrt{(2\\pi) \\cdot \\sigma^2_{d}}} \\cdot \\exp\\left[-\\frac{1}{2}\\sum^D_{d=1}(\\frac{x_{nd} - \\mu_{d} }{\\sigma_{d}})^2\\right] \\right)\\\\
    &= \\sum^{N}_{n=1}\\left(-\\frac{D}{2} \\cdot \\log(2\\pi) - \\frac{1}{2} \\sum^D_{d=1}\\log(\\sigma_{d}^2) - \\frac{1}{2} \\sum^D_{d=1}(\\frac{x_{nd} - \\mu_{d}}{\\sigma_{d}})^2\\right)\\\\
    &= \\sum^{N}_{n=1}\\left(-\\frac{D}{2} \\cdot \\log(2\\pi) - \\frac{1}{2} \\sum^D_{d=1}\\log(\\sigma_{d}^2) - \\frac{1}{2} \\sum^D_{d=1}(\\frac{\\mu^2_{d} - 2\\mu_{d}x_{nd} + x^2_{nd}}{\\sigma^2_{d}})\\right) \\\\
    \\frac{\\partial l(\\mu, \\Sigma)}{\\partial \\mu_{d}} &= \\frac{\\partial l}{\\partial \\mu_{d}} \\left( \\sum^{N}_{n=1}\\left(- \\frac{1}{2} \\sum^D_{d=1}\\frac{\\mu^2_{d} - 2\\mu_{d}x_{nd} + x^2_{nd}}{\\sigma^2_{d}}\\right)\\right) \\overset{!}{=} 0 \\\\
    0 &= -\\frac{1}{2} \\sum^{N}_{n=1}\\left(\\frac{2 \\mu_{d} - 2x_{nd}}{\\sigma^2_{d}}\\right) \\\\
    &= \\underbrace{-2\\cdot \\frac{1}{2\\sigma^2_{d}}}_{\\ne 0} \\sum^{N}_{n=1}(\\mu_{d} - x_{nd}) \\\\
    &= \\sum^{N}_{n=1}(\\mu_{d} - x_{nd}) \\\\
    N \\cdot \\mu_{d} &= \\sum^{N}_{k = 1} x_{nd} \\\\
    \\mu_{d} &= \\frac{1}{N} \\sum^{N}_{k = 1} x_{nd}
\\end{align*}

Deriving $\\sigma^2$:
\\begin{align*}
    \\frac{\\partial l(\\mu, \\Sigma)}{\\partial \\sigma^2_{d}} &= \\frac{\\partial l}{\\partial \\sigma^2_{d}}\\left(\\sum^{N}_{n=1} \\left(-\\frac{D}{2} \\cdot \\log(2\\pi) - \\frac{1}{2} \\sum^D_{d=1}\\log(\\sigma_{d}^2) - \\frac{1}{2} \\sum^D_{d=1}\\left(\\frac{x_{nd} - \\mu_{d}}{\\sigma_{d}}\\right)^2\\right)\\right) \\\\
    &= \\sum^{N}_{n=1} \\left(\\frac{1}{2 \\sigma^2_{d}} - \\frac{(x_{nd} - \\mu_{d})^2}{2 \\sigma_{d}^4}\\right) \\overset{!}{=} 0 \\\\
    N \\cdot \\frac{1}{2 \\sigma^2_{d}} &= \\sum^{N}_{n=1} \\frac{(x_{nd} - \\mu_{d})^2}{2 \\sigma_{d}^4} = \\frac{1}{2 \\sigma_{d}^4}\\sum^{N}_{n=1} (x_{nd} - \\mu_{d})^2\\\\
    N \\cdot \\sigma^2_{d} &= \\sum^{N}_{n=1}(x_{nd} - \\mu_{d})^2 \\\\
 \\sigma^2_{d} &= \\frac{1}{N} \\sum^{N}_{n=1}(x_{nd} - \\mu_{d})^2
\\end{align*}
\\newpage
\\section*{Exercise 3)}

Summarize the task:

\\begin{align*}
    p(k|\\theta) &= \\theta^{\\delta_{k,1}}\\cdot(1-\\theta)^{\\delta_{k,2}} \\\\
    p(x|k) &= \\mathcal{N}(x|\\mu_k, \\Sigma_k) = \\frac{1}{(2\\pi)^{D/2}|\\Sigma_k|^{1/2}}\\exp \\left(-\\frac{1}{2}\\left(x-\\mu_k\\right)^T\\Sigma_k^{-1}(x-\\mu_k)\\right) \\\\
    p(\\mu_k|k) &= \\mathcal{N}(\\mu_k|\\mu_{k,0}, \\Sigma_{k,0}) = \\frac{1}{(2\\pi)^{D/2}|\\Sigma_{k,0}|^{1/2}}\\exp \\left(-\\frac{1}{2}\\left(\\mu_k-\\mu_{k,0}\\right)^T\\Sigma_{k,0}^{-1}(\\mu_k-\\mu_{k,0})\\right)
\\end{align*}

\\subsection*{(a)}

Covariance matrices are diagonal, non-pooled. Class conditional now given with $\\Sigma_k = \\lambda \\Sigma_{k,0}$ as 

\\begin{align*}
    p(x|k) &= \\mathcal{N}(x|\\mu_k, \\lambda\\Sigma_{k,0}) = \\frac{1}{(2\\pi)^{D/2}|\\lambda\\Sigma_{k,0}|^{1/2}}\\exp \\left(-\\frac{\\lambda}{2}\\left(x-\\mu_k\\right)^T\\Sigma_{k,0}^{-1}(x-\\mu_k)\\right) \\\\
\\end{align*}

From the lecture we take the univariate Gaussian example and adapt it to the multivariate case. 

\\begin{align*}
    p(\\mu_k|x_1,\\dots, x_D) &= const(\\mu_k) \\cdot p(\\mu_k|\\mu_{k,0},\\Sigma_{k,0})\\cdot \\prod_{n=1}^{D}p(x_n|\\mu_k,\\lambda\\Sigma_{k,0}) \\\\
    &= const_{new}(\\mu_k) \\cdot \\exp\\left(-\\frac{1}{2}\\left(\\mu_k-\\mu_{k,0}\\right)^T\\Sigma_{k,0}^{-1}(\\mu_k-\\mu_{k,0})\\right) \\cdot \\prod_{n=1}^{D} \\exp \\left(-\\frac{\\lambda}{2}\\left(x_n-\\mu_k\\right)^T\\Sigma_{k,0}^{-1}(x_n-\\mu_k)\\right) \\\\
    &= const_{new}(\\mu_k) \\cdot \\exp\\left(-\\frac{1}{2}\\left(\\mu_k-\\mu_{k,0}\\right)^T\\Sigma_{k,0}^{-1}(\\mu_k-\\mu_{k,0})\\right) \\cdot \\exp \\left(-\\frac{\\lambda}{2}\\sum_{n=1}^{D}\\left(x_n-\\mu_k\\right)^T\\Sigma_{k,0}^{-1}(x_n-\\mu_k)\\right) \\\\
    &= const_{new}(\\mu_k) \\cdot \\exp\\left(-\\frac{1}{2}\\left(\\mu_k-\\mu_{k,0}\\right)^T\\Sigma_{k,0}^{-1}(\\mu_k-\\mu_{k,0})-\\frac{\\lambda}{2}\\sum_{n=1}^{D}\\left(x_n-\\mu_k\\right)^T\\Sigma_{k,0}^{-1}(x_n-\\mu_k)\\right) \\\\
    &= const_{new}(\\mu_k) \\cdot \\exp\\left(-\\frac{1}{2}\\left(\\left(\\mu_k-\\mu_{k,0}\\right)^T\\Sigma_{k,0}^{-1}(\\mu_k-\\mu_{k,0})+\\lambda\\sum_{n=1}^{D}\\left(x_n-\\mu_k\\right)^T\\Sigma_{k,0}^{-1}(x_n-\\mu_k)\\right)\\right) \\\\
\\end{align*}

According to the hint, we can now split the computation between $k=1$ and $k=2$. We can therefore omit the class label $k$, since the computation will be the same for both cases and just incurs different values.

\\begin{align*}
    &= const_{new}(\\mu) \\cdot \\exp\\left(-\\frac{1}{2}\\left(\\left(\\mu-\\mu_{0}\\right)^T\\Sigma_{0}^{-1}(\\mu-\\mu_{0})+\\lambda\\sum_{n=1}^{D}\\left(x_n-\\mu\\right)^T\\Sigma_{0}^{-1}(x_n-\\mu)\\right)\\right) \\\\
    &= const_{new}(\\mu) \\cdot \\exp\\left(-\\frac{1}{2}\\left(\\left(\\mu-\\mu_{0}\\right)^T\\Sigma_{0}^{-1}(\\mu-\\mu_{0})+\\lambda\\sum_{n=1}^{D}\\left(\\mu-x_n\\right)^T\\Sigma_{0}^{-1}(\\mu-x_n)\\right)\\right) \\\\
\\end{align*}

Apart from the constant scaling term, this is the formula of a Gaussian distributed with parameters $\\mu_N := \\mu_0+\\lambda\\sum_{n=1}^Dx_n$ and $\\Sigma_N := \\Sigma_0$, therefore $p(\\mu | x_1, \\dots, x_D) \\sim \\mathcal{N}\\left(\\mu_0+\\lambda\\sum_{n=1}^Dx_n, \\Sigma_0\\right)$.

\\begin{align*}
    p(\\mu | x_1, \\dots, x_D) &= const(\\mu_N) \\cdot \\exp\\left(-\\frac{1}{2}\\left(\\mu - \\left(\\mu_0+\\lambda\\sum_{n=1}^Dx_n\\right)\\right)^T\\Sigma_0^{-1}\\left(\\mu - \\left(\\mu_0+\\lambda\\sum_{n=1}^Dx_n\\right)\\right)\\right) \\\\
    &= const(\\mu_N) \\cdot \\exp\\left(-\\frac{1}{2}\\left(\\mu - \\mu_N\\right)^T\\Sigma_0^{-1}\\left(\\mu - \\mu_N\\right)\\right) \\\\
    &= \\frac{1}{(2\\pi)^{D/2}\\cdot |\\Sigma_N|^{1/2}} \\exp\\left(-\\frac{1}{2}\\left(\\mu - \\mu_N\\right)^T\\Sigma_0^{-1}\\left(\\mu - \\mu_N\\right)\\right) \\\\
\\end{align*}

From ML estimation we know $\\mu = \\frac{1}{n}\\sum_{i=1}^Dx_i$ and compare the coefficients. We have $D$ samples plus $\\lambda$ new training samples. Hence $n \\mapsto D+\\lambda$. For the $x_i$'s, they are split between the $D$ samples we already have plus the training samples $\\lambda$, which are accounted for with the base mean. The $D$ samples consist of $k$ classes, each of which have $N_k$ samples. According to the hint, we solve the problem independent of the classes:

\\begin{align*}
    \\hat{\\mu}_k^{\\text{MAP}} = \\frac{1}{N_k + \\lambda} \\left(\\lambda\\mu_{k,0} + \\sum_{n=1}^{N_k}x_n\\right)
\\end{align*}

\\subsection*{(b)}

Since variances are greater or equal to zero, there are four options for the relationship between $\\sigma_{k,d}^2$ and $\\sigma_{k,0,d}^2$ and therefore for the ratio of $\\frac{\\sigma_{k,d}^2}{\\sigma_{k,0,d}^2}$.

\\begin{itemize}
    \\item $\\sigma_{k,d}^2 > \\sigma_{k,0,d}^2$, $\\sigma_{k,0,d}^2 \\ne 0 \\Rightarrow \\frac{\\sigma_{k,d}^2}{\\sigma_{k,0,d}^2} > 1$: The old variance is smaller than the new one. The resulting surface would be smoother. $\\hat{\\mu}_k^{\\text{MAP}}$ would shift accordingly. For training, more uncertainty would get involved. For initial monitoring, the uncertainty would be smaller than after training.
    \\item $\\sigma_{k,d}^2 < \\sigma_{k,0,d}^2 \\Rightarrow \\frac{\\sigma_{k,d}^2}{\\sigma_{k,0,d}^2} \\in [0,1]$: The old variance is greater than the new one. $\\hat{\\mu}_k^{\\text{MAP}}$ would shift according to the new variance and the surface would have a higher peak. For training, the uncertainty would become smaller. For initial monitoring, the uncertainty would have been larger than after the training procedure. 
    \\item $\\sigma_{k,d}^2 = \\sigma_{k,0,d}^2 \\Rightarrow \\frac{\\sigma_{k,d}^2}{\\sigma_{k,0,d}^2} = 1$: Nothing changes, the weight of the new sample is the same as the weight for every other sample that has already been there. For initial monitoring, the new sample fits in the region of the other ones, there are similarly distributed. For training, the sample adds to the number of other ones, yet does not introduce a shift in the distribution. Therefore the new sample must be located at the mean, and $\\hat{\\mu}_k^{\\text{MAP}}$ would not change.
    \\item If the denominator $\\sigma_{k,0,d}^2 = 0$: A variance like this can only occur if we had exactly one sample at the start. Initial monitoring therefore would be difficult (since our point cloud only consists of one sample). For training and adding another sample, the initial sample would get a weight of 50\\% with the additional training sample getting another 50\\%, which might make the resulting estimator quite biased. 
\\end{itemize}


\\subsection*{(c)}

We use the formulas from the lecture.

\\begin{align*}
    \\hat{\\mu}_k^{Mean} = \\int \\mu_k \\cdot p(\\mu_k | x_1, \\dots, x_D) d\\mu_k \\\\
    \\hat{\\mu}_k^{Median} = \\int |\\mu_k-\\Tilde{\\mu}_k| p(\\mu_k | x_1, \\dots, x_D) d\\mu_k
\\end{align*}

Mean:

\\begin{align*}
    \\hat{\\mu}_k^{Mean} &= \\int \\mu_k \\cdot p(\\mu_k | x_1, \\dots, x_D) d\\mu_k \\\\
    &= \\int \\mu_k \\cdot \\frac{\\overbrace{p(x_1, \\dots, x_D|\\mu_k)}^{\\mu_k \\text{ independent of data}} \\cdot \\overbrace{p(\\mu_k)}^{\\text{constant}}}{p(x_1, \\dots, x_D)} d\\mu_k \\\\
    &= \\int \\mu_k \\cdot \\frac{p(x_1, \\dots, x_D)}{p(x_1, \\dots, x_D)} \\cdot p(\\mu_k) d\\mu_k \\\\
    &= \\int \\mu_k \\cdot p(\\mu_k) d\\mu_k \\\\
    &= \\frac{p(\\mu_k)}{2}\\mu_k^2 \\text{ (+ const)}\\\\
\\end{align*}

Median:

\\begin{align*}
    \\hat{\\mu}_k^{Median} &= \\int |\\mu_k-\\Tilde{\\mu}_k| p(\\mu_k | x_1, \\dots, x_D) d\\mu_k \\\\
    &= \\int |\\mu_k-\\Tilde{\\mu}_k| \\frac{p(x_1, \\dots, x_D | \\mu_k) \\cdot p(\\mu_k)}{p(x_1, \\dots, x_D)} d\\mu_k \\\\
    &= \\int |\\mu_k-\\Tilde{\\mu}_k| \\frac{p(x_1, \\dots, x_D) \\cdot p(\\mu_k)}{p(x_1, \\dots, x_D)} d\\mu_k \\\\
    &= \\int |\\mu_k-\\Tilde{\\mu}_k| p(\\mu_k) d\\mu_k \\\\
    &= p(\\mu_k) \\frac{(\\mu_k -\\Tilde{\\mu}_k)|\\mu_k-\\Tilde{\\mu}_k|}{2} \\text{ (+ const)} & \\text{(might be discontinuous)} \\\\
\\end{align*}


\\end{document}
`);


console.time("latex-parser");
lexer.read();
console.timeEnd("latex-parser");
console.log(lexer.stack);