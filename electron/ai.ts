export interface AIConfig {
  provider: 'cloud' | 'local'
  cloud?: {
    apiKey: string
    baseUrl?: string
    model: string
  }
  local?: {
    baseUrl: string
    model: string
  }
}

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export interface EventContext {
  location?: string
  playerState?: any
  recentActions?: string[]
  worldState?: any
}

export class AIService {
  private config: AIConfig | null = null

  setProvider(provider: 'cloud' | 'local', config: any): boolean {
    this.config = {
      provider,
      ...config
    }
    return true
  }

  async chat(messages: ChatMessage[], options?: { temperature?: number }): Promise<string> {
    if (!this.config) {
      throw new Error('AI 未配置')
    }

    if (this.config.provider === 'cloud') {
      return this.chatCloud(messages, options)
    } else {
      return this.chatLocal(messages, options)
    }
  }

  private async chatCloud(messages: ChatMessage[], options?: { temperature?: number }): Promise<string> {
    const { apiKey, baseUrl, model } = this.config!.cloud!
    
    const response = await fetch(`${baseUrl || 'https://api.openai.com/v1'}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: options?.temperature ?? 0.7
      })
    })

    if (!response.ok) {
      throw new Error(`AI 请求失败: ${response.statusText}`)
    }

    const data = await response.json()
    return data.choices[0].message.content
  }

  private async chatLocal(messages: ChatMessage[], options?: { temperature?: number }): Promise<string> {
    const { baseUrl, model } = this.config!.local!
    
    const response = await fetch(`${baseUrl}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model,
        messages,
        stream: false,
        options: {
          temperature: options?.temperature ?? 0.7
        }
      })
    })

    if (!response.ok) {
      throw new Error(`本地 AI 请求失败: ${response.statusText}`)
    }

    const data = await response.json()
    return data.message.content
  }

  async generateEvent(context: EventContext): Promise<any> {
    const systemPrompt = `你是一个修仙世界的游戏事件生成器。根据玩家当前的状态和位置，生成一个有趣的游戏事件。
事件应该包含：
- title: 事件标题（简短）
- description: 事件描述（详细，有画面感）
- choices: 玩家可选的行动列表（数组，每个选项包含 text 和 effects）
- effects: 每个选项可能带来的后果（正面或负面）

请以 JSON 格式返回，不要包含其他内容。`

    const userPrompt = `当前位置：${context.location || '未知'}
玩家状态：${JSON.stringify(context.playerState || {})}
最近行动：${context.recentActions?.join('、') || '无'}
世界状态：${JSON.stringify(context.worldState || {})}`

    try {
      const response = await this.chat([
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ], { temperature: 0.8 })

      return JSON.parse(response)
    } catch (error) {
      console.error('生成事件失败:', error)
      return this.getDefaultEvent()
    }
  }

  async generateDescription(type: string, data: any): Promise<string> {
    const prompts: Record<string, string> = {
      location: `描述一个修仙世界的${data.type || '地点'}，名为"${data.name}"。要求有画面感，包含环境、氛围、可能的机缘。字数100-200字。`,
      item: `描述一件修仙物品"${data.name}"，类型为${data.type || '未知'}。要求描述其外观、功效、来历。字数50-100字。`,
      npc: `描述一个修仙者"${data.name}"，境界为${data.realm || '未知'}。要求描述其外貌、气质、性格特点。字数80-150字。`,
      skill: `描述一门修仙功法"${data.name}"。要求描述其特点、修炼难度、威力。字数50-100字。`
    }

    const prompt = prompts[type] || `描述一个${type}：${JSON.stringify(data)}`

    try {
      return await this.chat([
        { role: 'user', content: prompt }
      ], { temperature: 0.7 })
    } catch (error) {
      console.error('生成描述失败:', error)
      return data.name || '未知'
    }
  }

  private getDefaultEvent(): any {
    const events = [
      {
        title: '灵气波动',
        description: '你感受到前方有一股奇异的灵气波动，似乎有什么东西在等待着你。',
        choices: [
          { text: '上前探查', effects: { spirit: 10, risk: 'low' } },
          { text: '绕道而行', effects: { safe: true } },
          { text: '静观其变', effects: { insight: 5 } }
        ]
      },
      {
        title: '偶遇修士',
        description: '一位路过的修士向你点头致意，似乎有话要说。',
        choices: [
          { text: '上前搭话', effects: { social: 1 } },
          { text: '点头回礼', effects: { karma: 1 } },
          { text: '无视离开', effects: {} }
        ]
      }
    ]
    return events[Math.floor(Math.random() * events.length)]
  }
}
