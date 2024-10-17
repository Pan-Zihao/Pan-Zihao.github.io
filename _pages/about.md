---
permalink: /
title: "Zihao Pan (潘子豪)"
excerpt: ""
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

{% if site.google_scholar_stats_use_cdn %}
{% assign gsDataBaseUrl = "https://cdn.jsdelivr.net/gh/" | append: site.repository | append: "@" %}
{% else %}
{% assign gsDataBaseUrl = "https://raw.githubusercontent.com/" | append: site.repository | append: "/" %}
{% endif %}
{% assign url = gsDataBaseUrl | append: "google-scholar-stats/gs_data_shieldsio.json" %}

<span class='anchor' id='about-me'></span>

I am a third-year undergraduate student at [the School of Software Engineering](https://sse.sysu.edu.cn/), Sun Yat-sen University. I am interning at [Inpluslab](https://inpluslab.com/) TAI, Sun Yat-sen University, focusing on **Adversarial Attack for Generative Models**, advised by [Weibin Wu](https://sse.sysu.edu.cn/teacher/249). At the same time, I am also interning at [Maple Lab](http://maple-lab.net), Westlake University, focusing on **video generation models**, advised by [Guo-Jun Qi](https://scholar.google.com/citations?user=Nut-uvoAAAAJ&hl=en) (IEEE Fellow). I have interned at [AIR](https://air.tsinghua.edu.cn/), Tsinghua University, focusing on **Image and video editing based on Diffusion**, advised by [Yan Wang](https://yanwang202199.github.io/).

My research interest includes **Diffusion models, Generative AI, Vison-Language models, AI Security and Trustworthy AI**. 

# 🔥 News
- I won the first prize 🥇 in the 2024 Guangdong University Students Mathematical Modeling Competition and the Guangdong Division of the National University Students Mathematical Modeling Competition!    -*2024.10.2*
- I am honored with the **Award of Merit** in SUMMER AIR 2024, Presented by Institute for AI Industry Research, Tsinghua University!    -*2024.9.25*
- The work on *SCA: Highly Efficient Semantic Consistent Unrestricted Adversarial Attack* has been preliminarily completed and is expected to be submitted to **IEEE TIFS**!    -*2024.9.24*

# 📝 Publications 
- **[SCA: Highly Efficient Semantic Consistent Unrestricted Adversarial Attack](https://arxiv.org/abs/2410.02240)**, **Zihao Pan**, Weibin WU, Yuhang Cao, Zibin Zheng *IEEE Fellow* (This paper has been submitted to **IEEE Transactions on Information Forensics ans Security(TIFS)** and is under review.)
- **On Exploring Adversarial Semantic Space of Large Vision-Language Model** (This paper is prepared to be submitted to **CVPR2025**.）
- **潘子豪**.[一种面向商圈店铺管理规划的机器学习建模分析技术](https://kns.cnki.net/kcms2/article/abstract?v=VIrt19joK6iVe6UAFg_kpR5W3z4P6NHQk-81IDDQykWq34eeDdjXZEwuHanQNyn_3vWdNU6H3srZ9uZzV_HQHeQpH5QCv-KfKEEEe6Z8aAHLXLxcARL-BeOGdhpfdFEY-YajZ3HxakYR33V0nsE0AJn81EqyjvgZf1Sg_xyfHq8=&uniplatform=NZKPT)[J].中国新技术新产品,2024(3):132-136

# 🎖 Honors and Awards
- **CVPR 2024 Workshop** - [Image Matching Challenge 2024](https://www.kaggle.com/competitions/image-matching-challenge-2024/overview) - Hexathlon（Kaggle） **Silver medal**🥈(20/930)
- **Award of Merit** in SUMMER AIR 2024, Presented by Institute for AI Industry Research, Tsinghua University
- 2024年广东省大学生数学建模竞赛暨全国大学生数学建模竞赛广东省分赛 一等奖🥇
- 2023年“高教社杯”全国大学生数学建模竞赛&“深圳杯”数学建模挑战赛 广东赛区三等奖
- 2023年广东省大学生数学建模竞赛暨全国大学生数学建模竞赛广东省分赛 三等奖
- 2023年第九届全国大学生统计建模大赛广东赛区本科生组三等奖
- 2023年APMCM亚太地区大学生数学建模竞赛 Third Prize
- 2023年第六届“高斯杯”全国大学生数学建模挑战赛 一等奖
- 计算机软件著作《一种用于人脸识别的图像处理软件V1.0》二作（证书号：软著登字第11658428号）
- 工业与信息化人才专业知识测评证书 数学建模科目（证书编号：GXRCCP018202312179）

# 📖 Educations
- *2022.09 - 2026.06*, Undergraduate, School of Software Engineering, Sun Yat-sen University. 

# 📃 Projects
<div class='paper-box'><div class='paper-box-image'><div><div class="badge">Submitted to TIFS</div><img src='[SCA.png](https://s2.loli.net/2024/10/18/43ekjHYtF8q7KaZ.png)' alt="sym" width="100%"></div></div>
<div class='paper-box-text' markdown="1">

**SCA: Highly Efficient Semantic Consistent Unrestricted Adversarial Attack**

***Zihao Pan**, Weibin WU, Yuhang Cao, Zibin Zheng IEEE Fellow*

Deep neural network based systems deployed in sensitive environments are vulnerable to adversarial attacks. Unrestricted adversarial attacks typically manipulate the semantic content of an image (e.g., color or texture) to create adversarial examples that are both effective and photorealistic. Recent works have utilized the diffusion inversion process to map images into a latent space, where high-level semantics are manipulated by introducing perturbations. However, they often results in substantial semantic distortions in the denoised output and suffers from low efficiency.  In this study, we propose a novel framework called Semantic-Consistent Unrestricted Adversarial Attacks (SCA), which employs an inversion method to extract edit-friendly noise maps and utilizes Multimodal Large Language Model (MLLM) to provide semantic guidance throughout the process. Under the condition of rich semantic information provided by MLLM, we perform the DDPM denoising process of each step using a series of edit-friendly noise maps, and leverage DPM Solver++ to accelerate this process, enabling efficient sampling with semantic consistency. Compared to existing methods, our framework enables the efficient generation of adversarial examples that exhibit minimal discernible semantic changes. Consequently, we for the first time introduce Semantic-Consistent Adversarial Examples (SCAE). Extensive experiments and visualizations have demonstrated the high efficiency of SCA, particularly in being on average 12 times faster than the state-of-the-art attacks. Our research can further draw attention to the security of multimedia information.  

2024.10.4: Our work is submitted to **IEEE TIFS**, and the paper has been uploaded to [arxiv](https://arxiv.org/abs/2410.02240). Welcome to follow!🎉
</div>
</div>

<div class='paper-box'><div class='paper-box-image'><div><div class="badge">Expected to submit to CVPR2025</div><img src='[pipeline.png](https://s2.loli.net/2024/10/18/FlSiIL1K4mVdy3T.png)' alt="sym" width="100%"></div></div>
<div class='paper-box-text' markdown="1">

**On Exploring Adversarial Semantic Space of Large Vision-Language Model**

***Zihao Pan**, Weibin WU, Yu Tong, Jinyi Wang, Yitong Qiao, Zibin Zheng IEEE Fellow*

Large Vision-Language Models (LVLMs) have demonstrated exceptional capabilities in a wide range of multimodal understanding and reasoning tasks. Compared to traditional language models, LVLMs are more susceptible to adversarial attacks due to the complexity of cross-modal tasks. Recent studies have implemented threats by meticulously designing perturbations in both language and visual modalities. Nevertheless, these methods generally rely on prior knowledge of the target model or depend on proxy models, limiting their efficacy in practical scenarios. Moreover, conventional noise-based approaches struggle to elucidate the patterns of model failures. To address these issues, we propose a semantic-based adversarial attack method for practical scenarios. In this setting, the attacker can only implement the attack through model queries. Our approach leverages a novel automated framework based on Large Language Models (LLMs) to search for adversarial visual representations across an extensive semantic space. Subsequently, text-to-image models can transform these representations into highly aligned images, serving as adversarial visual inputs for LVLMs. As these adversarial inputs are embodied in natural language, the interpretability of the attacks is significantly enhanced. Extensive experiments have demonstrated the effectiveness and versatility of our method, particularly its adaptability to various downstream tasks and LVLMs without task-specific designs. This research contributes to the undstanding of LVLM vulnerabilities and paves the way for more robust multimodal AI systems.

2024.9.26: Our work is in progress and we plan to submit it to **CVPR2025**. The paper and all the code will be uploaded after completion, so stay tuned!    
</div>
</div>
  
- **MapleVideo**(This is a project I did during my internship at the Maple Lab at Westlake University. For details, please refer to the lab's homepage.)    
     2024.9.26: Our work is in progress and we plan to submit it to **CVPR2025**.    

# 💻 Internships
- *2024.07 - now*, [Maple Lab](http://maple-lab.net/), Westlake University, Hangzhou, China
- *2023.08 - now*, [Inplus Lab]() TAI, Sun Yat-sen University, Zhuhai, China
- *2024.06 - 2024.09*, [AIR](https://air.tsinghua.edu.cn/), Tsinghua University, Beijing, China
- *2024.01 - 2024.03*, [AIR](https://air.tsinghua.edu.cn/), Tsinghua University, Beijing, China
