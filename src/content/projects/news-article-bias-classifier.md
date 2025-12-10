---
title: "News Article Political Bias Classifier"
description: "End-to-end NLP pipeline for political bias detection using RoBERTa transformers (69.7% accuracy on 24.5K articles)"
startDate: 2025-09-01
endDate: 2025-12-31
technologies: ["Python", "PyTorch", "Transformers", "RoBERTa", "NLP", "Pandas", "Scikit-learn"]
githubUrl: "https://github.com/jurinho17-sv/news-article-bias-classifier"
featured: false
draft: false
---

# News Article Political Bias Classifier

## Project Overview

Built a **production-ready NLP data pipeline** that processes **24,505 news articles** spanning 13 years (2012-2025) for automated political bias detection. This project demonstrates end-to-end machine learning engineering: from raw data collection through web scraping to deploying a fine-tuned transformer model that achieves **69.7% classification accuracy**—nearly 20 percentage points above baseline.

The system classifies articles into Left, Center, and Right political orientations, helping readers understand media bias patterns across different news sources and topics.

## Key Results

| Metric | Value | Impact |
|--------|-------|--------|
| **Overall Accuracy** | 69.7% | +19.7pp above baseline |
| **Best Performance** | 73.8% | Coronavirus topic |
| **Dataset Scale** | 24,505 articles | 13-year span (2012-2025) |
| **Data Quality** | 99.5% | Validation success rate |
| **Class Balance** | Left 34.4% / Center 31.4% / Right 34.2% | Well-balanced distribution |

## Technical Implementation

### Data Pipeline Architecture

Engineered a scalable, automated **5-stage ETL pipeline** with comprehensive quality validation at each stage:

1. **Data Collection**: Automated web scraping using NewsAPI + Trafilatura HTML parser
2. **Data Cleaning**: Text normalization, deduplication logic (removed 2,147 duplicates)
3. **Data Transformation**: Wide-to-long format conversion (8,478 → 24,505 articles)
4. **Feature Extraction**: Generated 768-dimensional contextual embeddings using pretrained RoBERTa-base
5. **Model Training**: Experimented with multiple architectures; final model uses 3-layer feedforward neural network

### Model Architecture

```
Input: RoBERTa Embeddings (768-dim)
    ↓
Dense Layer (768 → 256) + ReLU + Dropout(0.3)
    ↓
Dense Layer (256 → 128) + ReLU + Dropout(0.3)
    ↓
Output Layer (128 → 2) + Softmax
    ↓
Predictions: [Left, Right]
```

**Training Configuration**:
- Optimizer: Adam (lr=0.001)
- Loss Function: Cross-Entropy
- Batch Size: 32, Epochs: 20 with early stopping
- Regularization: Dropout + L2 weight decay

### Tech Stack

**Data Processing**: Python, Pandas, NumPy, NewsAPI, Trafilatura, Regex

**Machine Learning**: PyTorch, Transformers (Hugging Face), Scikit-learn

**Development**: Jupyter Notebook, Google Colab (GPU acceleration)

**Visualization**: Matplotlib, Seaborn

## Performance Breakdown

### Classification Accuracy by Topic

| Topic | Accuracy | Sample Size |
|-------|----------|-------------|
| Coronavirus | 73.8% | 1,242 articles |
| Politics | 67.0% | 2,232 articles |
| World | 65.8% | 1,161 articles |
| Economy & Jobs | 65.3% | 1,156 articles |
| Elections | 63.3% | 1,845 articles |

### Key Insight

Coronavirus-related articles showed the highest classification accuracy (73.8%), likely due to clearer partisan framing around pandemic policies such as lockdowns, vaccines, and mask mandates—making political bias more distinguishable.

## What I Learned

This project was my introduction to **end-to-end NLP engineering** and taught me several valuable lessons:

1. **Data Quality Matters**: Discovered that 99.5% data completeness and careful deduplication were crucial for model performance—garbage in, garbage out is real.

2. **Pipeline Design**: Learned to build scalable ETL workflows with validation at each stage, making it easy to retrain with new data or debug issues.

3. **Transfer Learning**: Leveraging pretrained RoBERTa embeddings saved weeks of training time and provided rich contextual representations that would be impossible to train from scratch.

4. **Real-World ML**: Experienced the full cycle from messy HTML content to a working classifier, including challenges like class imbalance, overfitting, and choosing appropriate evaluation metrics.

5. **Domain Knowledge**: Understanding political context (e.g., how Coronavirus became politicized) was as important as technical skills for interpreting results and improving the model.

## Future Improvements

- Fine-tune RoBERTa directly on political news corpus for domain adaptation
- Add attention visualization to interpret which words/phrases signal bias
- Deploy as REST API with FastAPI for real-time article classification
- Expand to multi-class classification including subcategories (far-left, center-left, etc.)

## Links

- [GitHub Repository](https://github.com/jurinho17-sv/news-article-bias-classifier)
- Dataset: [News Dataset for News Bias Analysis (Kaggle)](https://www.kaggle.com/datasets/articoder/news-dataset-for-news-bias-analysis)
- Course: UC Berkeley DATA 198 (Fall 2025)

---

*This project was completed as the final project for DATA 198 at UC Berkeley, where I learned to apply NLP techniques to real-world problems and gained hands-on experience with modern transformer architectures.*

