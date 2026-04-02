<template>
  <div class="pixel-home">
    <div class="pixel-stars"></div>
    <div class="pixel-particles">
      <div v-for="i in 20" :key="i" class="particle" :style="getParticleStyle(i)"></div>
    </div>
    
    <div class="home-content">
      <div class="title-section">
        <div class="game-logo">🏔️</div>
        <h1 class="game-title pixel-title">修仙世界</h1>
        <div class="game-subtitle">THE WORLD OF IMMORTALS</div>
        <div class="version-tag">v0.1.0 Pixel Edition</div>
      </div>
      
      <div class="menu-section">
        <PixelCard variant="primary" class="menu-card">
          <template #header>
            <span class="card-icon">🎮</span>
            <span>开始游戏</span>
          </template>
          <div class="menu-buttons">
            <PixelButton 
              variant="success" 
              size="large" 
              icon="⚔️"
              @click="startNewGame"
            >
              新的游戏
            </PixelButton>
            <PixelButton 
              variant="primary" 
              size="large" 
              icon="📖"
              @click="continueGame"
            >
              继续游戏
            </PixelButton>
          </div>
        </PixelCard>
        
        <div class="secondary-menu">
          <PixelButton variant="warning" size="medium" icon="⚙️" @click="openSettings">
            设置
          </PixelButton>
          <PixelButton variant="info" size="medium" icon="📚" @click="openGuide">
            引导
          </PixelButton>
          <PixelButton variant="purple" size="medium" icon="🏆" @click="openAchievements">
            成就
          </PixelButton>
          <PixelButton variant="secondary" size="medium" icon="📖" @click="openUpdateLog">
            更新日志
          </PixelButton>
        </div>
      </div>
      
      <div class="info-section">
        <PixelPanel variant="default" size="small" class="info-panel">
          <template #title>
            <span class="panel-icon">ℹ️</span>
            游戏信息
          </template>
          <div class="info-grid">
            <div class="info-item">
              <span class="info-icon">🎨</span>
              <span class="info-label">风格</span>
              <span class="info-value">像素艺术</span>
            </div>
            <div class="info-item">
              <span class="info-icon">🎯</span>
              <span class="info-label">类型</span>
              <span class="info-value">策略修仙</span>
            </div>
            <div class="info-item">
              <span class="info-icon">🤖</span>
              <span class="info-label">AI</span>
              <span class="info-value">内容生成</span>
            </div>
            <div class="info-item">
              <span class="info-icon">🌐</span>
              <span class="info-label">平台</span>
              <span class="info-value">跨平台</span>
            </div>
          </div>
        </PixelPanel>
      </div>
      
      <div class="footer-section">
        <div class="footer-text">
          <span>© 2024 修仙世界团队</span>
          <span class="separator">|</span>
          <span>Powered by Vue 3 + TypeScript</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import PixelButton from '@/components/ui/PixelButton.vue'
import PixelCard from '@/components/ui/PixelCard.vue'
import PixelPanel from '@/components/ui/PixelPanel.vue'

const router = useRouter()

function startNewGame() {
  router.push('/new-game')
}

function continueGame() {
  const savedGame = localStorage.getItem('immortalWorldSave')
  if (savedGame) {
    router.push('/game')
  } else {
    alert('没有找到存档，请开始新游戏！')
  }
}

function openSettings() {
  alert('设置功能开发中...')
}

function openGuide() {
  alert('引导功能开发中...')
}

function openAchievements() {
  alert('成就功能开发中...')
}

function openUpdateLog() {
  alert('更新日志功能开发中...')
}

function getParticleStyle(index: number) {
  const x = Math.random() * 100
  const y = Math.random() * 100
  const delay = Math.random() * 5
  const duration = 3 + Math.random() * 4
  
  return {
    left: `${x}%`,
    top: `${y}%`,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`
  }
}
</script>

<style scoped>
.pixel-home {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: 
    linear-gradient(180deg, 
      var(--pixel-color-bg-dark) 0%, 
      var(--pixel-color-bg) 50%, 
      var(--pixel-color-bg-dark) 100%
    );
  position: relative;
  overflow: hidden;
  padding: 2rem;
}

.pixel-stars {
  position: absolute;
  inset: 0;
  background-image: 
    radial-gradient(2px 2px at 20px 30px, rgba(255, 255, 255, 0.8), transparent),
    radial-gradient(2px 2px at 40px 70px, rgba(255, 255, 255, 0.6), transparent),
    radial-gradient(2px 2px at 50px 160px, rgba(255, 255, 255, 0.8), transparent),
    radial-gradient(2px 2px at 90px 40px, rgba(255, 255, 255, 0.6), transparent),
    radial-gradient(2px 2px at 130px 80px, rgba(255, 255, 255, 0.8), transparent),
    radial-gradient(2px 2px at 160px 120px, rgba(255, 255, 255, 0.6), transparent);
  background-size: 200px 200px;
  animation: twinkle 4s ease-in-out infinite;
}

@keyframes twinkle {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.6; }
}

.pixel-particles {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: var(--pixel-color-accent);
  border-radius: 50%;
  box-shadow: 
    0 0 8px var(--pixel-color-accent),
    0 0 16px var(--pixel-color-yellow);
  animation: float 5s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) scale(1);
    opacity: 0.6;
  }
  50% {
    transform: translateY(-20px) scale(1.2);
    opacity: 1;
  }
}

.home-content {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  max-width: 800px;
  width: 100%;
}

.title-section {
  text-align: center;
  animation: fadeInDown 0.8s ease-out;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.game-logo {
  font-size: 80px;
  filter: drop-shadow(4px 4px 0 rgba(0, 0, 0, 0.5));
  margin-bottom: 1rem;
  animation: bounce 2s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.game-title {
  font-size: 32px;
  margin-bottom: 0.5rem;
  text-shadow: 
    4px 4px 0 rgba(0, 0, 0, 0.8),
    0 0 20px rgba(255, 204, 0, 0.5);
  letter-spacing: 4px;
}

.game-subtitle {
  font-family: var(--pixel-font);
  font-size: 10px;
  color: var(--pixel-color-secondary);
  letter-spacing: 4px;
  margin-bottom: 0.5rem;
}

.version-tag {
  display: inline-block;
  font-family: var(--pixel-font);
  font-size: 8px;
  color: var(--pixel-color-accent);
  background: rgba(255, 204, 0, 0.1);
  border: 2px solid var(--pixel-color-accent);
  padding: 4px 12px;
  margin-top: 0.5rem;
}

.menu-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  animation: fadeInUp 0.8s ease-out 0.2s backwards;
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

.menu-card {
  width: 100%;
}

.menu-buttons {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

.secondary-menu {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1rem;
  width: 100%;
}

.info-section {
  width: 100%;
  animation: fadeInUp 0.8s ease-out 0.4s backwards;
}

.info-panel {
  width: 100%;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.info-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.02);
  border: 2px solid var(--pixel-color-secondary);
}

.info-icon {
  font-size: 20px;
  filter: drop-shadow(2px 2px 0 rgba(0, 0, 0, 0.5));
}

.info-label {
  font-family: var(--pixel-font);
  font-size: 8px;
  color: var(--pixel-color-secondary);
}

.info-value {
  font-family: var(--pixel-font);
  font-size: 10px;
  color: var(--pixel-color-accent);
  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.8);
}

.footer-section {
  text-align: center;
  animation: fadeInUp 0.8s ease-out 0.6s backwards;
}

.footer-text {
  font-family: var(--pixel-font);
  font-size: 8px;
  color: var(--pixel-color-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.separator {
  color: var(--pixel-color-accent);
}

@media (max-width: 768px) {
  .pixel-home {
    padding: 1rem;
  }
  
  .game-logo {
    font-size: 60px;
  }
  
  .game-title {
    font-size: 24px;
  }
  
  .menu-buttons {
    flex-direction: column;
  }
  
  .quick-menu {
    flex-direction: column;
  }
  
  .info-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
