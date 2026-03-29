<template>
  <div class="home-container">
    <div class="home-bg">
      <div class="bg-gradient"></div>
      <div class="mountain mountain-1"></div>
      <div class="mountain mountain-2"></div>
      <div class="mountain mountain-3"></div>
      <div class="cloud cloud-1"></div>
      <div class="cloud cloud-2"></div>
      <div class="cloud cloud-3"></div>
      <div class="stars">
        <div v-for="i in 50" :key="i" class="star" :style="getStarStyle(i)"></div>
      </div>
    </div>
    
    <div class="home-content">
      <div class="title-section">
        <div class="title-decoration top">
          <span class="deco-line"></span>
          <span class="deco-icon">☯</span>
          <span class="deco-line"></span>
        </div>
        
        <h1 class="title-main">修仙世界</h1>
        <p class="title-sub">The World of Immortals</p>
        
        <div class="title-decoration bottom">
          <span class="deco-line"></span>
          <span class="deco-icon">☯</span>
          <span class="deco-line"></span>
        </div>
      </div>
      
      <div class="menu-section">
        <button class="menu-btn primary" @click="startNewGame">
          <span class="btn-icon">🌟</span>
          <span class="btn-text">开始新游戏</span>
        </button>
        
        <button class="menu-btn" @click="loadGame">
          <span class="btn-icon">📜</span>
          <span class="btn-text">读取存档</span>
        </button>
        
        <button class="menu-btn" @click="goSettings">
          <span class="btn-icon">⚙️</span>
          <span class="btn-text">游戏设置</span>
        </button>
      </div>
      
      <div class="footer-section">
        <div class="version">v0.1.0</div>
        <div class="tagline">AI增强修仙模拟游戏</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function startNewGame() {
  router.push('/new-game')
}

function loadGame() {
  router.push('/load-game')
}

function goSettings() {
  router.push('/settings')
}

function getStarStyle(index: number) {
  const size = Math.random() * 2 + 1
  const left = Math.random() * 100
  const top = Math.random() * 60
  const delay = Math.random() * 3
  const duration = Math.random() * 2 + 2
  
  return {
    width: `${size}px`,
    height: `${size}px`,
    left: `${left}%`,
    top: `${top}%`,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`
  }
}
</script>

<style scoped>
.home-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background: var(--color-bg-primary);
}

.home-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.bg-gradient {
  position: absolute;
  inset: 0;
  background: 
    radial-gradient(ellipse at top, rgba(212, 175, 55, 0.05) 0%, transparent 50%),
    radial-gradient(ellipse at bottom, rgba(192, 64, 64, 0.03) 0%, transparent 50%),
    linear-gradient(180deg, 
      var(--color-bg-primary) 0%, 
      rgba(26, 26, 37, 1) 50%, 
      rgba(42, 26, 74, 0.5) 100%
    );
}

.mountain {
  position: absolute;
  bottom: 0;
  width: 0;
  height: 0;
  border-style: solid;
}

.mountain-1 {
  left: -5%;
  border-width: 0 200px 300px 200px;
  border-color: transparent transparent rgba(26, 26, 37, 0.8) transparent;
}

.mountain-2 {
  left: 30%;
  border-width: 0 250px 400px 250px;
  border-color: transparent transparent rgba(37, 37, 80, 0.6) transparent;
}

.mountain-3 {
  right: -10%;
  border-width: 0 300px 350px 300px;
  border-color: transparent transparent rgba(30, 30, 74, 0.7) transparent;
}

.cloud {
  position: absolute;
  background: rgba(212, 175, 55, 0.03);
  border-radius: 50%;
  filter: blur(20px);
  animation: float 30s ease-in-out infinite;
}

.cloud-1 {
  width: 300px;
  height: 80px;
  top: 20%;
  left: 10%;
}

.cloud-2 {
  width: 200px;
  height: 60px;
  top: 35%;
  right: 15%;
  animation-delay: -10s;
}

.cloud-3 {
  width: 250px;
  height: 70px;
  top: 15%;
  right: 30%;
  animation-delay: -20s;
}

@keyframes float {
  0%, 100% { transform: translateX(0) translateY(0); }
  25% { transform: translateX(30px) translateY(-15px); }
  50% { transform: translateX(60px) translateY(0); }
  75% { transform: translateX(30px) translateY(15px); }
}

.stars {
  position: absolute;
  inset: 0;
}

.star {
  position: absolute;
  background: var(--color-gold);
  border-radius: 50%;
  animation: twinkle 3s ease-in-out infinite;
  opacity: 0.6;
}

@keyframes twinkle {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.8; }
}

.home-content {
  text-align: center;
  z-index: 10;
  padding: 2rem;
  max-width: 450px;
  animation: fadeInUp 0.8s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.title-section {
  margin-bottom: 2.5rem;
}

.title-decoration {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.title-decoration.bottom {
  margin-top: 1rem;
  margin-bottom: 0;
}

.deco-line {
  width: 60px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--color-gold), transparent);
}

.deco-icon {
  font-size: 1.25rem;
  color: var(--color-gold);
  opacity: 0.8;
}

.title-main {
  font-family: var(--font-title);
  font-size: 3rem;
  font-weight: 700;
  color: var(--color-text-primary);
  text-shadow: 
    0 0 20px rgba(212, 175, 55, 0.3),
    0 0 40px rgba(212, 175, 55, 0.2);
  margin-bottom: 0.5rem;
  letter-spacing: 0.2em;
}

.title-sub {
  font-size: 0.875rem;
  color: var(--color-text-muted);
  letter-spacing: 0.4em;
  text-transform: uppercase;
}

.menu-section {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 2.5rem;
}

.menu-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  width: 220px;
  padding: 0.875rem 1.5rem;
  margin: 0 auto;
  background: linear-gradient(135deg, var(--color-bg-tertiary), var(--color-bg-secondary));
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  color: var(--color-text-primary);
  font-family: var(--font-title);
  font-size: var(--font-size-base);
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-normal);
  position: relative;
  overflow: hidden;
}

.menu-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(212, 175, 55, 0.1), transparent);
  opacity: 0;
  transition: opacity var(--transition-fast);
}

.menu-btn:hover {
  border-color: var(--color-gold-dark);
  transform: translateY(-2px);
  box-shadow: var(--shadow-glow);
}

.menu-btn:hover::before {
  opacity: 1;
}

.menu-btn.primary {
  background: linear-gradient(135deg, var(--color-gold-dark), var(--color-gold));
  border-color: var(--color-gold);
  color: var(--color-bg-primary);
}

.menu-btn.primary:hover {
  box-shadow: 
    var(--shadow-glow),
    0 0 30px rgba(212, 175, 55, 0.3);
}

.btn-icon {
  font-size: 1.125rem;
}

.btn-text {
  letter-spacing: 0.1em;
}

.footer-section {
  color: var(--color-text-muted);
}

.version {
  font-size: var(--font-size-xs);
  margin-bottom: 0.25rem;
  color: var(--color-gold);
  opacity: 0.6;
}

.tagline {
  font-size: var(--font-size-xs);
  letter-spacing: 0.1em;
}
</style>
