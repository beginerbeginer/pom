export interface SampleTemplate {
  id: string;
  name: string;
  xml: string;
}

export const SAMPLE_TEMPLATES: SampleTemplate[] = [
  {
    id: "financial-summary",
    name: "決算サマリー",
    xml: `<VStack w="max" h="max" padding="24" backgroundColor="F8F9FC" gap="16">
  <HStack w="max" gap="0" alignItems="center">
    <Shape w="8" h="48" shapeType="rect" fill.color="0E0D6A" />
    <VStack padding.left="16" gap="2">
      <Text fontSize="28" color="0E0D6A" bold="true">2025年度 第3四半期 決算サマリー</Text>
      <Text fontSize="12" color="5A5A8A">Financial Results Summary for Q3 FY2025｜2025年10月1日～12月31日</Text>
    </VStack>
  </HStack>
  <HStack w="max" gap="16" alignItems="start">
    <VStack gap="12">
      <VStack w="max" padding="12" backgroundColor="0E0D6A" border.color="0E0D6A" border.width="1">
        <Text fontSize="14" color="FFFFFF" textAlign="center" bold="true">主要経営指標（連結）</Text>
      </VStack>
      <Table w="max" defaultRowHeight="38">
        <Col width="140" />
        <Col width="110" />
        <Col width="110" />
        <Col width="80" />
        <Tr>
          <Td fontSize="11" color="FFFFFF" bold="true" textAlign="center" backgroundColor="1A1980">項目</Td>
          <Td fontSize="11" color="FFFFFF" bold="true" textAlign="center" backgroundColor="1A1980">当期実績</Td>
          <Td fontSize="11" color="FFFFFF" bold="true" textAlign="center" backgroundColor="1A1980">前年同期</Td>
          <Td fontSize="11" color="FFFFFF" bold="true" textAlign="center" backgroundColor="1A1980">増減率</Td>
        </Tr>
        <Tr>
          <Td fontSize="11" color="0E0D6A" bold="true" backgroundColor="E8EAF6">売上高</Td>
          <Td fontSize="11" color="1A1A1A" textAlign="right" backgroundColor="FFFFFF">4,285億円</Td>
          <Td fontSize="11" color="5A5A5A" textAlign="right" backgroundColor="FFFFFF">3,892億円</Td>
          <Td fontSize="11" color="0D7A3E" bold="true" textAlign="center" backgroundColor="E3F2E8">+10.1%</Td>
        </Tr>
        <Tr>
          <Td fontSize="11" color="0E0D6A" bold="true" backgroundColor="E8EAF6">営業利益</Td>
          <Td fontSize="11" color="1A1A1A" textAlign="right" backgroundColor="FFFFFF">512億円</Td>
          <Td fontSize="11" color="5A5A5A" textAlign="right" backgroundColor="FFFFFF">438億円</Td>
          <Td fontSize="11" color="0D7A3E" bold="true" textAlign="center" backgroundColor="E3F2E8">+16.9%</Td>
        </Tr>
        <Tr>
          <Td fontSize="11" color="0E0D6A" bold="true" backgroundColor="E8EAF6">経常利益</Td>
          <Td fontSize="11" color="1A1A1A" textAlign="right" backgroundColor="FFFFFF">498億円</Td>
          <Td fontSize="11" color="5A5A5A" textAlign="right" backgroundColor="FFFFFF">421億円</Td>
          <Td fontSize="11" color="0D7A3E" bold="true" textAlign="center" backgroundColor="E3F2E8">+18.3%</Td>
        </Tr>
        <Tr>
          <Td fontSize="11" color="0E0D6A" bold="true" backgroundColor="E8EAF6">当期純利益</Td>
          <Td fontSize="11" color="1A1A1A" textAlign="right" backgroundColor="FFFFFF">328億円</Td>
          <Td fontSize="11" color="5A5A5A" textAlign="right" backgroundColor="FFFFFF">276億円</Td>
          <Td fontSize="11" color="0D7A3E" bold="true" textAlign="center" backgroundColor="E3F2E8">+18.8%</Td>
        </Tr>
        <Tr>
          <Td fontSize="11" color="0E0D6A" bold="true" backgroundColor="E8EAF6">営業利益率</Td>
          <Td fontSize="11" color="1A1A1A" textAlign="right" backgroundColor="FFFFFF">11.9%</Td>
          <Td fontSize="11" color="5A5A5A" textAlign="right" backgroundColor="FFFFFF">11.3%</Td>
          <Td fontSize="11" color="0D7A3E" bold="true" textAlign="center" backgroundColor="E3F2E8">+0.6pt</Td>
        </Tr>
      </Table>
      <VStack w="max" padding="10" backgroundColor="FFFFFF" border.color="C5CAE9" border.width="1">
        <VStack gap="6">
          <Text fontSize="11" color="0E0D6A" bold="true">【セグメント別売上構成】</Text>
          <HStack gap="8">
            <VStack padding="6" backgroundColor="E8EAF6" border.color="0E0D6A" border.width="1">
              <VStack gap="2" alignItems="center">
                <Text fontSize="9" color="0E0D6A">デジタル事業</Text>
                <Text fontSize="11" color="0E0D6A" bold="true">1,842億円</Text>
                <Text fontSize="9" color="5A5A8A">43.0%</Text>
              </VStack>
            </VStack>
            <VStack padding="6" backgroundColor="FFF8E1" border.color="F9A825" border.width="1">
              <VStack gap="2" alignItems="center">
                <Text fontSize="9" color="E65100">ソリューション</Text>
                <Text fontSize="11" color="E65100" bold="true">1,285億円</Text>
                <Text fontSize="9" color="FF8F00">30.0%</Text>
              </VStack>
            </VStack>
            <VStack padding="6" backgroundColor="E8F5E9" border.color="2E7D32" border.width="1">
              <VStack gap="2" alignItems="center">
                <Text fontSize="9" color="1B5E20">その他</Text>
                <Text fontSize="11" color="1B5E20" bold="true">1,158億円</Text>
                <Text fontSize="9" color="388E3C">27.0%</Text>
              </VStack>
            </VStack>
          </HStack>
        </VStack>
      </VStack>
    </VStack>
    <VStack gap="12">
      <VStack w="max" padding="12" backgroundColor="0E0D6A" border.color="0E0D6A" border.width="1">
        <Text fontSize="14" color="FFFFFF" textAlign="center" bold="true">前年同期比推移（四半期別）</Text>
      </VStack>
      <VStack w="max" padding="12" backgroundColor="FFFFFF" border.color="C5CAE9" border.width="1">
        <Chart w="480" h="180" chartType="bar" showLegend="true" chartColors='["0E0D6A","5C6BC0"]'>
          <ChartSeries name="売上高（億円）">
            <ChartDataPoint label="Q1" value="3980" />
            <ChartDataPoint label="Q2" value="4120" />
            <ChartDataPoint label="Q3" value="4285" />
            <ChartDataPoint label="Q4予想" value="4450" />
          </ChartSeries>
          <ChartSeries name="営業利益（億円）">
            <ChartDataPoint label="Q1" value="465" />
            <ChartDataPoint label="Q2" value="488" />
            <ChartDataPoint label="Q3" value="512" />
            <ChartDataPoint label="Q4予想" value="535" />
          </ChartSeries>
        </Chart>
      </VStack>
      <VStack w="max" padding="10" backgroundColor="FFFFFF" border.color="C5CAE9" border.width="1">
        <Table w="max" defaultRowHeight="28">
          <Col width="100" />
          <Col width="90" />
          <Col width="90" />
          <Col width="90" />
          <Col width="90" />
          <Tr>
            <Td fontSize="10" color="FFFFFF" bold="true" textAlign="center" backgroundColor="3949AB">指標</Td>
            <Td fontSize="10" color="FFFFFF" bold="true" textAlign="center" backgroundColor="3949AB">Q1</Td>
            <Td fontSize="10" color="FFFFFF" bold="true" textAlign="center" backgroundColor="3949AB">Q2</Td>
            <Td fontSize="10" color="FFFFFF" bold="true" textAlign="center" backgroundColor="3949AB">Q3</Td>
            <Td fontSize="10" color="FFFFFF" bold="true" textAlign="center" backgroundColor="3949AB">通期予想</Td>
          </Tr>
          <Tr>
            <Td fontSize="10" color="0E0D6A" backgroundColor="E8EAF6">売上高成長率</Td>
            <Td fontSize="10" color="1A1A1A" textAlign="center" backgroundColor="FFFFFF">+8.2%</Td>
            <Td fontSize="10" color="1A1A1A" textAlign="center" backgroundColor="FFFFFF">+9.5%</Td>
            <Td fontSize="10" color="0D7A3E" bold="true" textAlign="center" backgroundColor="E3F2E8">+10.1%</Td>
            <Td fontSize="10" color="E65100" textAlign="center" backgroundColor="FFF3E0">+9.8%</Td>
          </Tr>
          <Tr>
            <Td fontSize="10" color="0E0D6A" backgroundColor="E8EAF6">営業利益率</Td>
            <Td fontSize="10" color="1A1A1A" textAlign="center" backgroundColor="FFFFFF">11.7%</Td>
            <Td fontSize="10" color="1A1A1A" textAlign="center" backgroundColor="FFFFFF">11.8%</Td>
            <Td fontSize="10" color="0D7A3E" bold="true" textAlign="center" backgroundColor="E3F2E8">11.9%</Td>
            <Td fontSize="10" color="E65100" textAlign="center" backgroundColor="FFF3E0">12.0%</Td>
          </Tr>
        </Table>
      </VStack>
    </VStack>
  </HStack>
  <VStack w="max" padding="12" backgroundColor="0E0D6A">
    <Text fontSize="14" color="FFFFFF" textAlign="center" bold="true">第3四半期 主要トピックス</Text>
  </VStack>
  <HStack w="max" gap="12">
    <VStack padding="10" backgroundColor="FFFFFF" border.color="0E0D6A" border.width="2">
      <VStack gap="6" alignItems="center">
        <Shape w="36" h="36" shapeType="ellipse" fill.color="E8EAF6" fontSize="12" color="0E0D6A">01</Shape>
        <Text fontSize="11" color="0E0D6A" textAlign="center" bold="true">新規事業の収益寄与</Text>
        <Text fontSize="9" color="3C3C3C" textAlign="center">AI・クラウド事業が前年比+42%成長、売上構成比15%に拡大。SaaS型サービスのARR（年間経常収益）が280億円を突破</Text>
      </VStack>
    </VStack>
    <VStack padding="10" backgroundColor="FFFFFF" border.color="0E0D6A" border.width="2">
      <VStack gap="6" alignItems="center">
        <Shape w="36" h="36" shapeType="ellipse" fill.color="E8EAF6" fontSize="12" color="0E0D6A">02</Shape>
        <Text fontSize="11" color="0E0D6A" textAlign="center" bold="true">コスト最適化の進展</Text>
        <Text fontSize="9" color="3C3C3C" textAlign="center">全社DX推進により販管費率が前年比1.2pt改善。物流拠点統合で年間45億円のコスト削減を実現</Text>
      </VStack>
    </VStack>
    <VStack padding="10" backgroundColor="FFFFFF" border.color="0E0D6A" border.width="2">
      <VStack gap="6" alignItems="center">
        <Shape w="36" h="36" shapeType="ellipse" fill.color="E8EAF6" fontSize="12" color="0E0D6A">03</Shape>
        <Text fontSize="11" color="0E0D6A" textAlign="center" bold="true">主力製品の成長加速</Text>
        <Text fontSize="9" color="3C3C3C" textAlign="center">フラッグシップ製品「NEXUS Pro」が累計導入社数5,000社突破。大企業向けエンタープライズ版の受注が好調</Text>
      </VStack>
    </VStack>
    <VStack padding="10" backgroundColor="FFFFFF" border.color="0E0D6A" border.width="2">
      <VStack gap="6" alignItems="center">
        <Shape w="36" h="36" shapeType="ellipse" fill.color="E8EAF6" fontSize="12" color="0E0D6A">04</Shape>
        <Text fontSize="11" color="0E0D6A" textAlign="center" bold="true">海外展開の加速</Text>
        <Text fontSize="9" color="3C3C3C" textAlign="center">ASEAN地域売上が前年比+28%。シンガポール拠点を起点に東南アジア6カ国での事業展開を本格化</Text>
      </VStack>
    </VStack>
  </HStack>
  <HStack w="max" gap="0" alignItems="center" justifyContent="spaceBetween">
    <Text fontSize="9" color="7A7A9A">※本資料に記載の数値はダミーデータです。実際の企業業績とは関係ありません。</Text>
    <Text fontSize="9" color="0E0D6A">株式会社サンプルホールディングス｜IR資料｜2025年1月発表</Text>
  </HStack>
</VStack>`,
  },
  {
    id: "product-landing",
    name: "プロダクト紹介",
    xml: `<VStack w="1280" h="max" padding="48" gap="40" backgroundColor="F8FAFC" alignItems="stretch">

  <VStack gap="16" alignItems="center">
    <Shape shapeType="roundRect" w="180" h="32" fontSize="14" bold="true"
           fill.color="DBEAFE" color="2563EB" borderRadius="16">
      NEW RELEASE
    </Shape>
    <Text fontSize="48" bold="true" color="0F172A" textAlign="center">
      次世代の業務効率化プラットフォーム
    </Text>
    <Text fontSize="18" color="64748B" textAlign="center" lineHeight="1.5">
      煩雑なプロセスを自動化し、チームの生産性を最大化します。
      導入から運用まで、専門チームが徹底サポート。
    </Text>
  </VStack>

  <HStack gap="24" alignItems="stretch">
    <VStack padding="32" backgroundColor="FFFFFF" borderRadius="16" shadow.type="outer" shadow.opacity="0.1" shadow.blur="10" shadow.angle="90" shadow.offset="4">
      <VStack gap="16" alignItems="start">
        <Shape shapeType="ellipse" w="48" h="48" fill.color="EEF2FF" fontSize="24" color="4F46E5">⚡</Shape>
        <Text fontSize="20" bold="true" color="0F172A">圧倒的なスピード</Text>
        <Text fontSize="14" color="475569" lineHeight="1.4">
          独自のエンジンにより、従来のツールと比較して約5倍の処理速度を実現しました。
        </Text>
      </VStack>
    </VStack>

    <VStack padding="32" backgroundColor="FFFFFF" borderRadius="16" shadow.type="outer" shadow.opacity="0.1" shadow.blur="10" shadow.angle="90" shadow.offset="4">
      <VStack gap="16" alignItems="start">
        <Shape shapeType="ellipse" w="48" h="48" fill.color="ECFDF5" fontSize="24" color="059669">🔒</Shape>
        <Text fontSize="20" bold="true" color="0F172A">高度なセキュリティ</Text>
        <Text fontSize="14" color="475569" lineHeight="1.4">
          金融機関レベルの暗号化技術を標準搭載。大切なデータを安全に守ります。
        </Text>
      </VStack>
    </VStack>

    <VStack padding="32" backgroundColor="FFFFFF" borderRadius="16" shadow.type="outer" shadow.opacity="0.1" shadow.blur="10" shadow.angle="90" shadow.offset="4">
      <VStack gap="16" alignItems="start">
        <Shape shapeType="ellipse" w="48" h="48" fill.color="FFFBEB" fontSize="24" color="D97706">📱</Shape>
        <Text fontSize="20" bold="true" color="0F172A">マルチデバイス対応</Text>
        <Text fontSize="14" color="475569" lineHeight="1.4">
          PC、スマートフォン、タブレット。場所を選ばず、いつでもどこでもアクセス可能。
        </Text>
      </VStack>
    </VStack>
  </HStack>

  <VStack w="max" padding="40" backgroundColor="1E293B" borderRadius="16">
    <HStack gap="40" alignItems="center" justifyContent="spaceBetween">
      <VStack gap="8" w="60%">
        <Text fontSize="24" bold="true" color="FFFFFF">まずは無料トライアルから</Text>
        <Text fontSize="14" color="94A3B8">すべての機能を14日間無料でお試しいただけます。</Text>
      </VStack>
      <Shape shapeType="roundRect" w="240" h="56" fontSize="18" bold="true"
             fill.color="2563EB" color="FFFFFF" borderRadius="8">
        無料で始める
      </Shape>
    </HStack>
  </VStack>

</VStack>`,
  },
  {
    id: "pricing-plan",
    name: "料金プラン",
    xml: `<VStack h="max" w="max" padding="48" backgroundColor="F8FAFC" gap="40" alignItems="center">
  <VStack gap="12" alignItems="center">
    <Shape shapeType="roundRect" w="140" h="32" fill.color="EEF2FF" color="6366F1" fontSize="12" bold="true">PRICING</Shape>
    <Text fontSize="40" color="1E293B" bold="true">シンプルで、迷わない料金プラン</Text>
    <Text fontSize="16" color="64748B">すべてのプランに14日間の無料トライアルがつきます</Text>
  </VStack>

  <HStack w="100%" gap="24" alignItems="end">
    <VStack w="30%" padding="32" backgroundColor="FFFFFF" borderRadius="32" shadow.type="outer" shadow.opacity="0.05" shadow.blur="20" shadow.offset="10">
      <VStack gap="24">
        <Shape shapeType="ellipse" w="56" h="56" fill.color="E0F7FA" color="0891B2" fontSize="24" bold="true">🌱</Shape>
        <VStack gap="4">
          <Text fontSize="20" color="0891B2" bold="true">ライト</Text>
          <HStack gap="4" alignItems="end">
            <Text fontSize="36" bold="true" color="1E293B">¥0</Text>
            <Text fontSize="14" color="94A3B8">/月</Text>
          </HStack>
        </VStack>
        <Ul fontSize="13" color="64748B" lineHeight="1.8">
          <Li text="最大3プロジェクト" />
          <Li text="基本テンプレート利用" />
          <Li text="コミュニティサポート" />
        </Ul>
        <Shape shapeType="roundRect" w="max" h="56" fill.color="F1F5F9" color="64748B" fontSize="15" bold="true">無料で始める</Shape>
      </VStack>
    </VStack>

    <VStack w="32%" padding="40" backgroundColor="FFFFFF" borderRadius="32" border.color="6366F1" border.width="3" shadow.type="outer" shadow.opacity="0.15" shadow.blur="30" shadow.offset="15">
      <VStack gap="24">
        <HStack justifyContent="spaceBetween" alignItems="center">
          <Shape shapeType="ellipse" w="64" h="64" fill.color="EEF2FF" color="6366F1" fontSize="28" bold="true">🚀</Shape>
          <Shape shapeType="roundRect" w="100" h="28" fill.color="6366F1" color="FFFFFF" fontSize="11" bold="true">一番人気！</Shape>
        </HStack>
        <VStack gap="4">
          <Text fontSize="24" color="6366F1" bold="true">スタンダード</Text>
          <HStack gap="4" alignItems="end">
            <Text fontSize="44" bold="true" color="1E293B">¥4,980</Text>
            <Text fontSize="14" color="94A3B8">/月</Text>
          </HStack>
        </VStack>
        <Ul fontSize="14" color="1E293B" lineHeight="1.8" bold="true">
          <Li text="プロジェクト無制限" />
          <Li text="AIアシスタント機能" />
          <Li text="高度な分析レポート" />
          <Li text="24時間メールサポート" />
        </Ul>
        <Shape shapeType="roundRect" w="max" h="60" fill.color="6366F1" shadow.type="outer" shadow.opacity="0.3" shadow.blur="10" color="FFFFFF" fontSize="16" bold="true">14日間無料で試す</Shape>
      </VStack>
    </VStack>

    <VStack w="30%" padding="32" backgroundColor="FFFFFF" borderRadius="32" shadow.type="outer" shadow.opacity="0.05" shadow.blur="20" shadow.offset="10">
      <VStack gap="24">
        <Shape shapeType="ellipse" w="56" h="56" fill.color="FFFBEB" color="D97706" fontSize="24" bold="true">💎</Shape>
        <VStack gap="4">
          <Text fontSize="20" color="D97706" bold="true">ビジネス</Text>
          <HStack gap="4" alignItems="end">
            <Text fontSize="32" bold="true" color="1E293B">要お見積り</Text>
          </HStack>
        </VStack>
        <Ul fontSize="13" color="64748B" lineHeight="1.8">
          <Li text="専任サクセスマネージャー" />
          <Li text="SSO / SAML認証" />
          <Li text="操作ログ保存（無制限）" />
          <Li text="個別トレーニング実施" />
        </Ul>
        <Shape shapeType="roundRect" w="max" h="56" fill.color="1E293B" color="FFFFFF" fontSize="15" bold="true">お問い合わせ</Shape>
      </VStack>
    </VStack>
  </HStack>

  <Text fontSize="12" color="94A3B8">※価格はすべて税抜き表示です。年間契約の場合さらに20%OFFが適用されます。</Text>
</VStack>`,
  },
  {
    id: "chart-showcase",
    name: "チャート集",
    xml: `<VStack w="max" h="max" padding="32" backgroundColor="FAFAFA" gap="20">
  <VStack gap="4" alignItems="center">
    <Text fontSize="28" color="212121" bold="true">データビジュアライゼーション</Text>
    <Text fontSize="14" color="757575">各種チャートの表示サンプル</Text>
  </VStack>
  <HStack w="max" gap="16">
    <VStack padding="16" backgroundColor="FFFFFF" border.color="E0E0E0" border.width="1" borderRadius="8">
      <VStack gap="8">
        <Text fontSize="14" color="212121" bold="true">棒グラフ — 月別売上推移</Text>
        <Chart w="420" h="200" chartType="bar" showLegend="true" chartColors='["90CAF9","1565C0"]'>
          <ChartSeries name="2024年">
            <ChartDataPoint label="1月" value="320" />
            <ChartDataPoint label="2月" value="280" />
            <ChartDataPoint label="3月" value="350" />
            <ChartDataPoint label="4月" value="410" />
            <ChartDataPoint label="5月" value="380" />
            <ChartDataPoint label="6月" value="420" />
          </ChartSeries>
          <ChartSeries name="2025年">
            <ChartDataPoint label="1月" value="380" />
            <ChartDataPoint label="2月" value="340" />
            <ChartDataPoint label="3月" value="400" />
            <ChartDataPoint label="4月" value="460" />
            <ChartDataPoint label="5月" value="440" />
            <ChartDataPoint label="6月" value="500" />
          </ChartSeries>
        </Chart>
      </VStack>
    </VStack>
    <VStack padding="16" backgroundColor="FFFFFF" border.color="E0E0E0" border.width="1" borderRadius="8">
      <VStack gap="8">
        <Text fontSize="14" color="212121" bold="true">折れ線グラフ — ユーザー数推移</Text>
        <Chart w="420" h="200" chartType="line" showLegend="true" chartColors='["1565C0","FF6F00"]'>
          <ChartSeries name="MAU">
            <ChartDataPoint label="1月" value="12000" />
            <ChartDataPoint label="2月" value="14500" />
            <ChartDataPoint label="3月" value="16200" />
            <ChartDataPoint label="4月" value="19800" />
            <ChartDataPoint label="5月" value="22400" />
            <ChartDataPoint label="6月" value="25000" />
          </ChartSeries>
          <ChartSeries name="DAU">
            <ChartDataPoint label="1月" value="3200" />
            <ChartDataPoint label="2月" value="3800" />
            <ChartDataPoint label="3月" value="4500" />
            <ChartDataPoint label="4月" value="5200" />
            <ChartDataPoint label="5月" value="6100" />
            <ChartDataPoint label="6月" value="7000" />
          </ChartSeries>
        </Chart>
      </VStack>
    </VStack>
  </HStack>
  <HStack w="max" gap="16">
    <VStack padding="16" backgroundColor="FFFFFF" border.color="E0E0E0" border.width="1" borderRadius="8">
      <VStack gap="8">
        <Text fontSize="14" color="212121" bold="true">円グラフ — 顧客構成</Text>
        <Chart w="260" h="200" chartType="pie" showLegend="true" chartColors='["1565C0","26A69A","FF6F00","AB47BC","78909C"]'>
          <ChartSeries name="業種別">
            <ChartDataPoint label="製造業" value="35" />
            <ChartDataPoint label="IT" value="25" />
            <ChartDataPoint label="金融" value="20" />
            <ChartDataPoint label="小売" value="12" />
            <ChartDataPoint label="その他" value="8" />
          </ChartSeries>
        </Chart>
      </VStack>
    </VStack>
    <VStack padding="16" backgroundColor="FFFFFF" border.color="E0E0E0" border.width="1" borderRadius="8">
      <VStack gap="8">
        <Text fontSize="14" color="212121" bold="true">ドーナツ — 予算配分</Text>
        <Chart w="260" h="200" chartType="doughnut" showLegend="true" chartColors='["1565C0","2E7D32","FF6F00","AB47BC","78909C"]'>
          <ChartSeries name="予算">
            <ChartDataPoint label="開発" value="40" />
            <ChartDataPoint label="マーケ" value="20" />
            <ChartDataPoint label="人件費" value="25" />
            <ChartDataPoint label="インフラ" value="10" />
            <ChartDataPoint label="その他" value="5" />
          </ChartSeries>
        </Chart>
      </VStack>
    </VStack>
    <VStack padding="16" backgroundColor="FFFFFF" border.color="E0E0E0" border.width="1" borderRadius="8">
      <VStack gap="8">
        <Text fontSize="14" color="212121" bold="true">レーダー — スキル評価</Text>
        <Chart w="260" h="200" chartType="radar" showLegend="true" chartColors='["1565C0","FF6F00"]'>
          <ChartSeries name="チームA">
            <ChartDataPoint label="技術" value="90" />
            <ChartDataPoint label="管理" value="70" />
            <ChartDataPoint label="企画" value="80" />
            <ChartDataPoint label="営業" value="60" />
            <ChartDataPoint label="分析" value="85" />
          </ChartSeries>
          <ChartSeries name="チームB">
            <ChartDataPoint label="技術" value="75" />
            <ChartDataPoint label="管理" value="85" />
            <ChartDataPoint label="企画" value="70" />
            <ChartDataPoint label="営業" value="80" />
            <ChartDataPoint label="分析" value="65" />
          </ChartSeries>
        </Chart>
      </VStack>
    </VStack>
  </HStack>
  <VStack w="max" padding="16" backgroundColor="FFFFFF" border.color="E0E0E0" border.width="1" borderRadius="8">
    <VStack gap="8">
      <Text fontSize="14" color="212121" bold="true">エリアチャート — トラフィック推移</Text>
      <Chart w="max" h="180" chartType="area" showLegend="true" chartColors='["1565C0","81D4FA"]'>
        <ChartSeries name="オーガニック">
          <ChartDataPoint label="月" value="4500" />
          <ChartDataPoint label="火" value="5200" />
          <ChartDataPoint label="水" value="4800" />
          <ChartDataPoint label="木" value="5800" />
          <ChartDataPoint label="金" value="6200" />
          <ChartDataPoint label="土" value="3200" />
          <ChartDataPoint label="日" value="2800" />
        </ChartSeries>
        <ChartSeries name="広告">
          <ChartDataPoint label="月" value="2000" />
          <ChartDataPoint label="火" value="2400" />
          <ChartDataPoint label="水" value="2200" />
          <ChartDataPoint label="木" value="2800" />
          <ChartDataPoint label="金" value="3100" />
          <ChartDataPoint label="土" value="1500" />
          <ChartDataPoint label="日" value="1200" />
        </ChartSeries>
      </Chart>
    </VStack>
  </VStack>
</VStack>`,
  },
  {
    id: "project-dashboard",
    name: "プロジェクト管理ダッシュボード",
    xml: `<VStack w="max" h="max" padding="28" backgroundColor="0B1220" gap="18">
  <HStack w="max" justifyContent="spaceBetween" alignItems="center">
    <VStack gap="4">
      <Text fontSize="30" color="F8FAFC" bold="true">プロジェクト管理ダッシュボード</Text>
      <Text fontSize="13" color="94A3B8">Project phases, delivery flow, governance, and team structure in one view</Text>
    </VStack>
    <HStack gap="10">
      <Icon name="layout-dashboard" size="22" color="60A5FA" variant="circle-filled" bgColor="172554" w="46" h="46" />
      <Icon name="git-branch" size="22" color="34D399" variant="circle-filled" bgColor="052E2B" w="46" h="46" />
      <Icon name="shield-check" size="22" color="FBBF24" variant="circle-filled" bgColor="3B2F07" w="46" h="46" />
    </HStack>
  </HStack>

  <HStack w="max" gap="18" alignItems="stretch">
    <VStack w="58%" gap="18">
      <VStack w="max" padding="16" backgroundColor="111827" border.color="334155" border.width="1" borderRadius="18">
        <VStack gap="12">
          <HStack justifyContent="spaceBetween" alignItems="center">
            <HStack gap="10" alignItems="center">
              <Icon name="calendar-range" size="18" color="93C5FD" variant="square-filled" bgColor="1E3A8A" w="38" h="38" />
              <Text fontSize="18" color="E2E8F0" bold="true">プロジェクトフェーズ</Text>
            </HStack>
            <Text fontSize="11" color="94A3B8">Timeline</Text>
          </HStack>
          <Timeline w="max" direction="horizontal">
            <TimelineItem date="Phase 1" title="要件定義" description="スコープ確定・体制準備" color="60A5FA" />
            <TimelineItem date="Phase 2" title="設計" description="UI/技術設計・レビュー" color="818CF8" />
            <TimelineItem date="Phase 3" title="開発" description="実装・結合" color="34D399" />
            <TimelineItem date="Phase 4" title="検証" description="QA・受入テスト" color="F59E0B" />
            <TimelineItem date="Phase 5" title="展開" description="リリース・定着化" color="F472B6" />
          </Timeline>
        </VStack>
      </VStack>

      <VStack w="max" padding="16" backgroundColor="111827" border.color="334155" border.width="1" borderRadius="18">
        <VStack gap="12">
          <HStack justifyContent="spaceBetween" alignItems="center">
            <HStack gap="10" alignItems="center">
              <Icon name="workflow" size="18" color="6EE7B7" variant="square-filled" bgColor="064E3B" w="38" h="38" />
              <Text fontSize="18" color="E2E8F0" bold="true">開発プロセス</Text>
            </HStack>
            <Text fontSize="11" color="94A3B8">ProcessArrow</Text>
          </HStack>
          <ProcessArrow w="max" direction="horizontal" itemHeight="72" fontSize="13" bold="true">
            <ProcessArrowStep label="Backlog整理" color="1D4ED8" textColor="FFFFFF" />
            <ProcessArrowStep label="Sprint計画" color="4F46E5" textColor="FFFFFF" />
            <ProcessArrowStep label="Build &amp; Code" color="059669" textColor="FFFFFF" />
            <ProcessArrowStep label="Test" color="D97706" textColor="FFFFFF" />
            <ProcessArrowStep label="Deploy" color="DB2777" textColor="FFFFFF" />
          </ProcessArrow>
        </VStack>
      </VStack>

      <VStack w="max" padding="16" backgroundColor="111827" border.color="334155" border.width="1" borderRadius="18">
        <VStack gap="12">
          <HStack justifyContent="spaceBetween" alignItems="center">
            <HStack gap="10" alignItems="center">
              <Icon name="git-fork" size="18" color="FCD34D" variant="square-filled" bgColor="78350F" w="38" h="38" />
              <Text fontSize="18" color="E2E8F0" bold="true">意思決定フロー</Text>
            </HStack>
            <Text fontSize="11" color="94A3B8">Flow</Text>
          </HStack>
          <Flow w="max" h="180" direction="horizontal" nodeWidth="118" nodeHeight="54" nodeGap="58" connectorStyle.color="64748B" connectorStyle.width="2" connectorStyle.arrowType="arrow">
            <FlowNode id="start" shape="flowChartTerminator" text="要求受付" color="1E3A8A" textColor="FFFFFF" />
            <FlowNode id="review" shape="flowChartProcess" text="影響評価" color="334155" textColor="FFFFFF" />
            <FlowNode id="decision" shape="flowChartDecision" text="承認?" color="7C3AED" textColor="FFFFFF" />
            <FlowNode id="implement" shape="flowChartProcess" text="実装へ" color="065F46" textColor="FFFFFF" />
            <FlowNode id="hold" shape="flowChartProcess" text="保留/再調整" color="92400E" textColor="FFFFFF" />
            <FlowConnection from="start" to="review" color="64748B" />
            <FlowConnection from="review" to="decision" color="64748B" />
            <FlowConnection from="decision" to="implement" label="Yes" color="34D399" />
            <FlowConnection from="decision" to="hold" label="No" color="F59E0B" />
          </Flow>
        </VStack>
      </VStack>
    </VStack>

    <VStack w="42%" gap="18">
      <VStack w="max" padding="16" backgroundColor="111827" border.color="334155" border.width="1" borderRadius="18">
        <VStack gap="12">
          <HStack justifyContent="spaceBetween" alignItems="center">
            <HStack gap="10" alignItems="center">
              <Icon name="users" size="18" color="C4B5FD" variant="square-filled" bgColor="4C1D95" w="38" h="38" />
              <Text fontSize="18" color="E2E8F0" bold="true">プロジェクト組織図</Text>
            </HStack>
            <Text fontSize="11" color="94A3B8">Tree</Text>
          </HStack>
          <Tree w="max" h="300" layout="vertical" nodeShape="roundRect" nodeWidth="120" nodeHeight="42" levelGap="44" siblingGap="16" connectorStyle.color="475569" connectorStyle.width="2">
            <TreeItem label="Steering Committee" color="1D4ED8">
              <TreeItem label="PMO" color="0F766E">
                <TreeItem label="Dev Lead" color="7C3AED" />
                <TreeItem label="QA Lead" color="D97706" />
                <TreeItem label="Design Lead" color="DB2777" />
              </TreeItem>
            </TreeItem>
          </Tree>
        </VStack>
      </VStack>

      <VStack w="max" padding="16" backgroundColor="111827" border.color="334155" border.width="1" borderRadius="18">
        <VStack gap="14">
          <Text fontSize="18" color="E2E8F0" bold="true">ステータスハイライト</Text>
          <HStack w="max" gap="12">
            <VStack w="max" padding="14" backgroundColor="0F172A" border.color="1E3A8A" border.width="1" borderRadius="14">
              <VStack gap="8" alignItems="center">
                <Icon name="target" size="20" color="60A5FA" variant="circle-filled" bgColor="172554" w="44" h="44" />
                <Text fontSize="12" color="94A3B8">進捗率</Text>
                <Text fontSize="24" color="F8FAFC" bold="true">68%</Text>
              </VStack>
            </VStack>
            <VStack w="max" padding="14" backgroundColor="0F172A" border.color="065F46" border.width="1" borderRadius="14">
              <VStack gap="8" alignItems="center">
                <Icon name="check-check" size="20" color="34D399" variant="circle-filled" bgColor="052E2B" w="44" h="44" />
                <Text fontSize="12" color="94A3B8">完了タスク</Text>
                <Text fontSize="24" color="F8FAFC" bold="true">124</Text>
              </VStack>
            </VStack>
          </HStack>
          <HStack w="max" gap="12">
            <VStack w="max" padding="14" backgroundColor="0F172A" border.color="78350F" border.width="1" borderRadius="14">
              <VStack gap="8" alignItems="center">
                <Icon name="alert-triangle" size="20" color="F59E0B" variant="circle-filled" bgColor="3B2F07" w="44" h="44" />
                <Text fontSize="12" color="94A3B8">リスク</Text>
                <Text fontSize="24" color="F8FAFC" bold="true">05</Text>
              </VStack>
            </VStack>
            <VStack w="max" padding="14" backgroundColor="0F172A" border.color="4C1D95" border.width="1" borderRadius="14">
              <VStack gap="8" alignItems="center">
                <Icon name="clock-3" size="20" color="C084FC" variant="circle-filled" bgColor="2E1065" w="44" h="44" />
                <Text fontSize="12" color="94A3B8">次回レビュー</Text>
                <Text fontSize="18" color="F8FAFC" bold="true">Fri 16:00</Text>
              </VStack>
            </VStack>
          </HStack>
        </VStack>
      </VStack>
    </VStack>
  </HStack>
</VStack>`,
  },
  {
    id: "strategy-analysis",
    name: "経営戦略分析",
    xml: `<VStack w="1280" h="720" padding="32" backgroundColor="F8FBFF" gap="18">
 <HStack w="max" justifyContent="spaceBetween" alignItems="center">
 <HStack gap="14" alignItems="center">
 <Icon name="briefcase" size="26" color="2563EB" variant="circle-filled" bgColor="DBEAFE" w="54" h="54" />
 <VStack gap="2">
 <Text fontSize="30" color="0F172A" bold="true">経営戦略分析</Text>
 <Text fontSize="13" color="64748B">Strategic Analysis Overview｜重点施策・優先順位・実行計画</Text>
 </VStack>
 </HStack>
 <VStack padding.top="10" padding.right="14" padding.bottom="10" padding.left="14" backgroundColor="EFF6FF" border.color="BFDBFE" border.width="1" borderRadius="18">
 <Text fontSize="12" color="1D4ED8" bold="true">FY2026 Strategic Focus</Text>
 </VStack>
 </HStack>

 <Line x1="32" y1="92" x2="1248" y2="92" color="D6E4FF" lineWidth="2" />

 <HStack w="max" h="max" gap="18" alignItems="stretch">
 <VStack w="35%" gap="14">
 <VStack w="max" padding="18" backgroundColor="FFFFFF" border.color="DCEBFF" border.width="1" borderRadius="16">
 <VStack gap="14">
 <HStack gap="10" alignItems="center">
 <Icon name="layers-3" size="20" color="2563EB" variant="square-filled" bgColor="E0ECFF" w="40" h="40" />
 <Text fontSize="18" color="1E3A8A" bold="true">戦略ピラミッド</Text>
 </HStack>
 <Pyramid w="max" h="250" direction="down" fontSize="14" bold="true">
 <PyramidLevel label="ビジョン" color="DBEAFE" textColor="1E3A8A" />
 <PyramidLevel label="重点戦略" color="93C5FD" textColor="0F172A" />
 <PyramidLevel label="実行基盤" color="60A5FA" textColor="FFFFFF" />
 <PyramidLevel label="施策群" color="2563EB" textColor="FFFFFF" />
 </Pyramid>
 </VStack>
 </VStack>

 <VStack w="max" padding="16" backgroundColor="FFFFFF" border.color="DCEBFF" border.width="1" borderRadius="16">
 <VStack gap="10">
 <HStack gap="10" alignItems="center">
 <Icon name="list-checks" size="20" color="1D4ED8" variant="square-filled" bgColor="DBEAFE" w="40" h="40" />
 <Text fontSize="18" color="1E3A8A" bold="true">アクションプラン</Text>
 </HStack>
 <Ol fontSize="13" color="334155" lineHeight="1.6" numberType="arabicParenR">
 <Li text="重点顧客セグメントを再定義し、営業資源を再配分する" />
 <Li text="基幹業務のデジタル化投資を優先し、収益性を改善する" />
 <Li text="新市場向けパートナー戦略を立ち上げ、成長機会を拡大する" />
 <Li text="KPIレビューを月次化し、施策の継続判断を高速化する" />
 </Ol>
 </VStack>
 </VStack>
 </VStack>

 <VStack w="65%" gap="14">
 <VStack w="max" padding="18" backgroundColor="FFFFFF" border.color="DCEBFF" border.width="1" borderRadius="16">
 <VStack gap="12">
 <HStack justifyContent="spaceBetween" alignItems="center">
 <HStack gap="10" alignItems="center">
 <Icon name="layout-grid" size="20" color="2563EB" variant="square-filled" bgColor="E0ECFF" w="40" h="40" />
 <Text fontSize="18" color="1E3A8A" bold="true">優先度マトリクス</Text>
 </HStack>
 <Text fontSize="12" color="64748B">縦軸: 事業インパクト / 横軸: 実現容易性</Text>
 </HStack>
 <Matrix w="max" h="350">
 <MatrixAxes x="実現容易性" y="事業インパクト" />
 <MatrixQuadrants topLeft="要検討" topRight="最優先" bottomLeft="後回し" bottomRight="効率案件" />
 <MatrixItem label="価格戦略見直し" x="0.72" y="0.84" color="1D4ED8" />
 <MatrixItem label="営業DX" x="0.66" y="0.76" color="2563EB" />
 <MatrixItem label="新市場参入" x="0.38" y="0.86" color="60A5FA" />
 <MatrixItem label="管理部門効率化" x="0.82" y="0.42" color="93C5FD" />
 <MatrixItem label="ブランド再構築" x="0.44" y="0.58" color="3B82F6" />
 <MatrixItem label="全社ERP刷新" x="0.26" y="0.36" color="BFDBFE" />
 </Matrix>
 </VStack>
 </VStack>

 <HStack w="max" gap="14">
 <VStack w="max" padding="16" backgroundColor="FFFFFF" border.color="DCEBFF" border.width="1" borderRadius="16">
 <VStack gap="10">
 <HStack gap="10" alignItems="center">
 <Icon name="target" size="18" color="2563EB" variant="circle-filled" bgColor="DBEAFE" w="38" h="38" />
 <Text fontSize="16" color="1E3A8A" bold="true">示唆</Text>
 </HStack>
 <Text fontSize="13" color="475569" lineHeight="1.55">高インパクトかつ実現容易性の高い「価格戦略見直し」と「営業DX」を最優先とし、短期成果を創出しながら中長期施策へ投資余力を回す構成が有効です。</Text>
 </VStack>
 </VStack>
 <VStack w="max" padding="16" backgroundColor="FFFFFF" border.color="DCEBFF" border.width="1" borderRadius="16">
 <VStack gap="10">
 <HStack gap="10" alignItems="center">
 <Icon name="shield-check" size="18" color="1D4ED8" variant="circle-filled" bgColor="E0ECFF" w="38" h="38" />
 <Text fontSize="16" color="1E3A8A" bold="true">経営メッセージ</Text>
 </HStack>
 <Text fontSize="13" color="475569" lineHeight="1.55">短期の利益改善施策と、中期の変革投資を二層で管理することで、成長性と確実性のバランスを取りやすくなります。</Text>
 </VStack>
 </VStack>
 </HStack>
 </VStack>
 </HStack>
</VStack>`,
  },
  {
    id: "saas-kpi",
    name: "SaaS KPIダッシュボード",
    xml: `<VStack w="max" h="max" padding="28" backgroundColor="0F172A" gap="18">

  <HStack w="max" alignItems="center" justifyContent="spaceBetween">
    <HStack gap="12" alignItems="center">
      <Icon name="activity" size="28" color="34D399" variant="square-filled" bgColor="064E3B" w="44" h="44" />
      <VStack gap="2">
        <Text fontSize="22" color="F1F5F9" bold="true">SaaS KPI Dashboard</Text>
        <Text fontSize="11" color="64748B">2025 Q2 — リアルタイム業績モニタリング</Text>
      </VStack>
    </HStack>
    <HStack gap="8" alignItems="center">
      <Shape shapeType="ellipse" w="8" h="8" fill.color="34D399" />
      <Text fontSize="11" color="34D399">LIVE</Text>
      <VStack padding.top="4" padding.bottom="4" padding.left="12" padding.right="12" backgroundColor="1E293B" borderRadius="6">
        <Text fontSize="11" color="94A3B8">最終更新: 2025-06-30 09:00</Text>
      </VStack>
    </HStack>
  </HStack>

  <HStack w="max" gap="12">
    <VStack w="max" padding="16" backgroundColor="1E293B" borderRadius="12" border.color="1E3A5F" border.width="1">
      <VStack gap="8">
        <HStack alignItems="center" justifyContent="spaceBetween">
          <Text fontSize="11" color="64748B">MRR</Text>
          <Icon name="trending-up" size="16" color="38BDF8" variant="circle-filled" bgColor="0C2A3F" w="28" h="28" />
        </HStack>
        <Text fontSize="26" color="F1F5F9" bold="true">¥48.2M</Text>
        <HStack gap="4" alignItems="center">
          <Icon name="arrow-up" size="12" color="34D399" />
          <Text fontSize="11" color="34D399" bold="true">+12.4%</Text>
          <Text fontSize="11" color="475569">前月比</Text>
        </HStack>
      </VStack>
    </VStack>
    <VStack w="max" padding="16" backgroundColor="1E293B" borderRadius="12" border.color="1E3A5F" border.width="1">
      <VStack gap="8">
        <HStack alignItems="center" justifyContent="spaceBetween">
          <Text fontSize="11" color="64748B">ARR</Text>
          <Icon name="bar-chart" size="16" color="38BDF8" variant="circle-filled" bgColor="0C2A3F" w="28" h="28" />
        </HStack>
        <Text fontSize="26" color="F1F5F9" bold="true">¥578M</Text>
        <HStack gap="4" alignItems="center">
          <Icon name="arrow-up" size="12" color="34D399" />
          <Text fontSize="11" color="34D399" bold="true">+18.2%</Text>
          <Text fontSize="11" color="475569">前年比</Text>
        </HStack>
      </VStack>
    </VStack>
    <VStack w="max" padding="16" backgroundColor="1E293B" borderRadius="12" border.color="1E3A5F" border.width="1">
      <VStack gap="8">
        <HStack alignItems="center" justifyContent="spaceBetween">
          <Text fontSize="11" color="64748B">Churn Rate</Text>
          <Icon name="user-minus" size="16" color="F87171" variant="circle-filled" bgColor="3F1212" w="28" h="28" />
        </HStack>
        <Text fontSize="26" color="F1F5F9" bold="true">1.8%</Text>
        <HStack gap="4" alignItems="center">
          <Icon name="arrow-down" size="12" color="34D399" />
          <Text fontSize="11" color="34D399" bold="true">-0.3pt</Text>
          <Text fontSize="11" color="475569">前月比</Text>
        </HStack>
      </VStack>
    </VStack>
    <VStack w="max" padding="16" backgroundColor="1E293B" borderRadius="12" border.color="1E3A5F" border.width="1">
      <VStack gap="8">
        <HStack alignItems="center" justifyContent="spaceBetween">
          <Text fontSize="11" color="64748B">NRR</Text>
          <Icon name="refresh-cw" size="16" color="34D399" variant="circle-filled" bgColor="064E3B" w="28" h="28" />
        </HStack>
        <Text fontSize="26" color="F1F5F9" bold="true">118%</Text>
        <HStack gap="4" alignItems="center">
          <Icon name="arrow-up" size="12" color="34D399" />
          <Text fontSize="11" color="34D399" bold="true">+3pt</Text>
          <Text fontSize="11" color="475569">前四半期比</Text>
        </HStack>
      </VStack>
    </VStack>
  </HStack>

  <HStack w="max" gap="14" alignItems="start">
    <VStack w="max" gap="12">
      <VStack w="max" padding="16" backgroundColor="1E293B" borderRadius="12" border.color="1E3A5F" border.width="1">
        <VStack gap="8">
          <HStack alignItems="center" gap="8">
            <Icon name="line-chart" size="14" color="38BDF8" />
            <Text fontSize="13" color="CBD5E1" bold="true">MRR 推移（直近12ヶ月）</Text>
          </HStack>
          <Chart w="max" h="160" chartType="line" showLegend="true" chartColors='["38BDF8","34D399"]'>
            <ChartSeries name="MRR (万円)">
              <ChartDataPoint label="7月" value="3280" />
              <ChartDataPoint label="8月" value="3450" />
              <ChartDataPoint label="9月" value="3620" />
              <ChartDataPoint label="10月" value="3810" />
              <ChartDataPoint label="11月" value="3990" />
              <ChartDataPoint label="12月" value="4150" />
              <ChartDataPoint label="1月" value="4280" />
              <ChartDataPoint label="2月" value="4390" />
              <ChartDataPoint label="3月" value="4510" />
              <ChartDataPoint label="4月" value="4640" />
              <ChartDataPoint label="5月" value="4750" />
              <ChartDataPoint label="6月" value="4820" />
            </ChartSeries>
            <ChartSeries name="新規MRR (万円)">
              <ChartDataPoint label="7月" value="420" />
              <ChartDataPoint label="8月" value="480" />
              <ChartDataPoint label="9月" value="510" />
              <ChartDataPoint label="10月" value="560" />
              <ChartDataPoint label="11月" value="590" />
              <ChartDataPoint label="12月" value="620" />
              <ChartDataPoint label="1月" value="580" />
              <ChartDataPoint label="2月" value="610" />
              <ChartDataPoint label="3月" value="650" />
              <ChartDataPoint label="4月" value="680" />
              <ChartDataPoint label="5月" value="700" />
              <ChartDataPoint label="6月" value="730" />
            </ChartSeries>
          </Chart>
        </VStack>
      </VStack>

      <VStack w="max" padding="16" backgroundColor="1E293B" borderRadius="12" border.color="1E3A5F" border.width="1">
        <VStack gap="8">
          <HStack alignItems="center" gap="8">
            <Icon name="table" size="14" color="38BDF8" />
            <Text fontSize="13" color="CBD5E1" bold="true">プラン別 主要メトリクス</Text>
          </HStack>
          <Table w="max" defaultRowHeight="28">
            <Col width="90" />
            <Col width="80" />
            <Col width="80" />
            <Col width="80" />
            <Col width="70" />
            <Col width="70" />
            <Tr>
              <Td fontSize="10" color="94A3B8" bold="true" backgroundColor="0F172A" textAlign="center">プラン</Td>
              <Td fontSize="10" color="94A3B8" bold="true" backgroundColor="0F172A" textAlign="center">契約数</Td>
              <Td fontSize="10" color="94A3B8" bold="true" backgroundColor="0F172A" textAlign="center">MRR貢献</Td>
              <Td fontSize="10" color="94A3B8" bold="true" backgroundColor="0F172A" textAlign="center">ARPU</Td>
              <Td fontSize="10" color="94A3B8" bold="true" backgroundColor="0F172A" textAlign="center">Churn</Td>
              <Td fontSize="10" color="94A3B8" bold="true" backgroundColor="0F172A" textAlign="center">NRR</Td>
            </Tr>
            <Tr>
              <Td fontSize="10" color="38BDF8" bold="true" backgroundColor="1E293B">Starter</Td>
              <Td fontSize="10" color="E2E8F0" textAlign="center" backgroundColor="1E293B">1,240</Td>
              <Td fontSize="10" color="E2E8F0" textAlign="center" backgroundColor="1E293B">¥6.2M</Td>
              <Td fontSize="10" color="E2E8F0" textAlign="center" backgroundColor="1E293B">¥5,000</Td>
              <Td fontSize="10" color="F87171" textAlign="center" backgroundColor="1E293B">3.2%</Td>
              <Td fontSize="10" color="34D399" textAlign="center" backgroundColor="1E293B">102%</Td>
            </Tr>
            <Tr>
              <Td fontSize="10" color="34D399" bold="true" backgroundColor="162032">Growth</Td>
              <Td fontSize="10" color="E2E8F0" textAlign="center" backgroundColor="162032">680</Td>
              <Td fontSize="10" color="E2E8F0" textAlign="center" backgroundColor="162032">¥20.4M</Td>
              <Td fontSize="10" color="E2E8F0" textAlign="center" backgroundColor="162032">¥30,000</Td>
              <Td fontSize="10" color="FBBF24" textAlign="center" backgroundColor="162032">1.5%</Td>
              <Td fontSize="10" color="34D399" textAlign="center" backgroundColor="162032">115%</Td>
            </Tr>
            <Tr>
              <Td fontSize="10" color="A78BFA" bold="true" backgroundColor="1E293B">Enterprise</Td>
              <Td fontSize="10" color="E2E8F0" textAlign="center" backgroundColor="1E293B">142</Td>
              <Td fontSize="10" color="E2E8F0" textAlign="center" backgroundColor="1E293B">¥21.6M</Td>
              <Td fontSize="10" color="E2E8F0" textAlign="center" backgroundColor="1E293B">¥152,000</Td>
              <Td fontSize="10" color="34D399" textAlign="center" backgroundColor="1E293B">0.4%</Td>
              <Td fontSize="10" color="34D399" textAlign="center" backgroundColor="1E293B">128%</Td>
            </Tr>
          </Table>
        </VStack>
      </VStack>
    </VStack>

    <VStack gap="12" w="340">
      <VStack w="max" padding="16" backgroundColor="1E293B" borderRadius="12" border.color="064E3B" border.width="1">
        <VStack gap="10">
          <HStack alignItems="center" gap="8">
            <Icon name="zap" size="14" color="34D399" variant="circle-filled" bgColor="064E3B" w="24" h="24" />
            <Text fontSize="13" color="CBD5E1" bold="true">注目ポイント</Text>
          </HStack>
          <Ul fontSize="12" color="94A3B8" lineHeight="1.6">
            <Li color="34D399" bold="true" text="Enterprise NRR 128% — 過去最高を更新" />
            <Li text="Growthプランへのアップグレード率が前月比+22%" />
            <Li text="CAC 8.9%削減でLTV/CAC比が15倍超に改善" />
            <Li color="38BDF8" bold="true" text="新規MRR ¥7.3M — 3ヶ月連続で過去最高" />
            <Li text="Churn Rate 1.8% — 業界平均(3.5%)を大幅に下回る" />
          </Ul>
        </VStack>
      </VStack>

      <VStack w="max" padding="16" backgroundColor="1E293B" borderRadius="12" border.color="1E3A5F" border.width="1">
        <VStack gap="10">
          <HStack alignItems="center" gap="8">
            <Icon name="users" size="14" color="38BDF8" />
            <Text fontSize="13" color="CBD5E1" bold="true">顧客数サマリー</Text>
          </HStack>
          <HStack w="max" gap="8">
            <VStack w="max" padding="10" backgroundColor="0F172A" borderRadius="8">
              <VStack gap="4" alignItems="center">
                <Text fontSize="18" color="38BDF8" bold="true">2,062</Text>
                <Text fontSize="10" color="64748B">総契約数</Text>
              </VStack>
            </VStack>
            <VStack w="max" padding="10" backgroundColor="0F172A" borderRadius="8">
              <VStack gap="4" alignItems="center">
                <Text fontSize="18" color="34D399" bold="true">+148</Text>
                <Text fontSize="10" color="64748B">今月純増</Text>
              </VStack>
            </VStack>
            <VStack w="max" padding="10" backgroundColor="0F172A" borderRadius="8">
              <VStack gap="4" alignItems="center">
                <Text fontSize="18" color="A78BFA" bold="true">94.2%</Text>
                <Text fontSize="10" color="64748B">継続率</Text>
              </VStack>
            </VStack>
          </HStack>
        </VStack>
      </VStack>
    </VStack>
  </HStack>

  <VStack w="max" padding="16" backgroundColor="1E293B" borderRadius="12" border.color="1E3A5F" border.width="1">
    <VStack gap="10">
      <HStack alignItems="center" gap="8">
        <Icon name="flag" size="14" color="34D399" />
        <Text fontSize="13" color="CBD5E1" bold="true">2025年 四半期マイルストーン</Text>
      </HStack>
      <Timeline direction="horizontal" w="max">
        <TimelineItem date="Q1 2025" title="ARR ¥480M 達成" description="Enterprise契約が前年比+45%" color="38BDF8" />
        <TimelineItem date="Q2 2025" title="NRR 118% 更新" description="アップセル強化施策が奏功" color="34D399" />
        <TimelineItem date="Q3 2025 (予)" title="ARR ¥600M 目標" description="APAC市場への本格展開" color="A78BFA" />
        <TimelineItem date="Q4 2025 (予)" title="IPO 準備フェーズ" description="監査法人選定・財務体制強化" color="FBBF24" />
      </Timeline>
    </VStack>
  </VStack>

  <HStack w="max" justifyContent="spaceBetween" alignItems="center">
    <Text fontSize="10" color="334155">© 2025 SaaS Co. — Confidential</Text>
    <HStack gap="16">
      <HStack gap="4" alignItems="center">
        <Shape shapeType="ellipse" w="6" h="6" fill.color="38BDF8" />
        <Text fontSize="10" color="475569">MRR</Text>
      </HStack>
      <HStack gap="4" alignItems="center">
        <Shape shapeType="ellipse" w="6" h="6" fill.color="34D399" />
        <Text fontSize="10" color="475569">成長指標</Text>
      </HStack>
      <HStack gap="4" alignItems="center">
        <Shape shapeType="ellipse" w="6" h="6" fill.color="A78BFA" />
        <Text fontSize="10" color="475569">Enterprise</Text>
      </HStack>
    </HStack>
  </HStack>

</VStack>`,
  },
  {
    id: "dx-roadmap",
    name: "DX推進ロードマップ",
    xml: `<VStack w="max" h="max" padding="28" backgroundColor="F0F0FF" gap="14">
  
  <HStack w="max" gap="12" alignItems="center">
    <Icon name="rocket" size="28" color="FFFFFF" variant="square-filled" bgColor="6C3AED" w="48" h="48" />
    <VStack gap="2">
      <Text fontSize="32" color="1E1B4B" bold="true">DX推進ロードマップ 2025-2029</Text>
      <Text fontSize="13" color="6D6B99">Digital Transformation Roadmap — 全社横断デジタル変革プログラム</Text>
    </VStack>
  </HStack>

  <HStack w="max" gap="14" alignItems="start">

    <VStack w="max" gap="12">
      
      <HStack gap="6" alignItems="center">
        <Icon name="arrow-right-circle" size="16" color="7C3AED" />
        <Text fontSize="15" color="4C1D95" bold="true">DX推進フェーズ</Text>
      </HStack>
      <ProcessArrow w="max" h="72" direction="horizontal" itemWidth="120" itemHeight="64" fontSize="11" bold="true">
        <ProcessArrowStep label="現状分析" color="C4B5FD" textColor="3B0764" />
        <ProcessArrowStep label="基盤構築" color="A78BFA" textColor="FFFFFF" />
        <ProcessArrowStep label="業務変革" color="8B5CF6" textColor="FFFFFF" />
        <ProcessArrowStep label="データ駆動" color="7C3AED" textColor="FFFFFF" />
        <ProcessArrowStep label="自律進化" color="5B21B6" textColor="FFFFFF" />
      </ProcessArrow>

      <HStack gap="6" alignItems="center" margin.top="4">
        <Icon name="triangle" size="16" color="2563EB" />
        <Text fontSize="15" color="1E3A8A" bold="true">DX成熟度モデル</Text>
      </HStack>
      <Pyramid w="max" h="180" direction="up" fontSize="12" bold="true">
        <PyramidLevel label="自律的イノベーション" color="1E40AF" textColor="FFFFFF" />
        <PyramidLevel label="データドリブン経営" color="2563EB" textColor="FFFFFF" />
        <PyramidLevel label="業務プロセス最適化" color="3B82F6" textColor="FFFFFF" />
        <PyramidLevel label="デジタル基盤整備" color="60A5FA" textColor="1E3A8A" />
        <PyramidLevel label="アナログ業務中心" color="BFDBFE" textColor="1E40AF" />
      </Pyramid>
    </VStack>

    <VStack w="max" gap="12">
      
      <HStack gap="6" alignItems="center">
        <Icon name="layout-grid" size="16" color="7C3AED" />
        <Text fontSize="15" color="4C1D95" bold="true">施策優先順位マトリクス</Text>
      </HStack>
      <Matrix w="max" h="280">
        <MatrixAxes x="実現容易性" y="ビジネスインパクト" />
        <MatrixQuadrants topLeft="戦略的投資" topRight="最優先実行" bottomLeft="様子見" bottomRight="即効施策" />
        <MatrixItem label="AI分析基盤" x="0.3" y="0.85" color="7C3AED" />
        <MatrixItem label="RPA導入" x="0.8" y="0.45" color="2563EB" />
        <MatrixItem label="クラウド移行" x="0.75" y="0.8" color="6D28D9" />
        <MatrixItem label="ペーパーレス" x="0.85" y="0.3" color="3B82F6" />
        <MatrixItem label="データ基盤" x="0.4" y="0.7" color="8B5CF6" />
        <MatrixItem label="IoTセンサー" x="0.25" y="0.5" color="4F46E5" />
        <MatrixItem label="社内SNS" x="0.65" y="0.25" color="60A5FA" />
        <MatrixItem label="顧客DX" x="0.55" y="0.9" color="5B21B6" />
      </Matrix>
    </VStack>

  </HStack>

  <HStack w="max" gap="14" alignItems="start">
    
    <VStack w="max" gap="8">
      <HStack gap="6" alignItems="center">
        <Icon name="calendar" size="16" color="6D28D9" />
        <Text fontSize="15" color="4C1D95" bold="true">年次マイルストーン</Text>
      </HStack>
      <Timeline w="max" h="120" direction="horizontal">
        <TimelineItem date="2025 Q2" title="基盤構築完了" description="クラウド移行・データ基盤" color="C4B5FD" />
        <TimelineItem date="2026 Q1" title="RPA全社展開" description="50業務の自動化達成" color="A78BFA" />
        <TimelineItem date="2027 Q1" title="AI分析稼働" description="予測分析・意思決定支援" color="7C3AED" />
        <TimelineItem date="2028 Q2" title="データ駆動経営" description="KPIダッシュボード全社導入" color="5B21B6" />
        <TimelineItem date="2029 Q4" title="自律進化達成" description="継続的イノベーション体制" color="3B0764" />
      </Timeline>
    </VStack>

  </HStack>

  <HStack w="max" gap="16" justifyContent="center">
    <HStack gap="6" alignItems="center">
      <Icon name="target" size="18" color="FFFFFF" variant="circle-filled" bgColor="7C3AED" w="28" h="28" />
      <VStack gap="1">
        <Text fontSize="11" color="4C1D95" bold="true">目標ROI</Text>
        <Text fontSize="13" color="1E1B4B" bold="true">300%（5年累計）</Text>
      </VStack>
    </HStack>
    <HStack gap="6" alignItems="center">
      <Icon name="users" size="18" color="FFFFFF" variant="circle-filled" bgColor="2563EB" w="28" h="28" />
      <VStack gap="1">
        <Text fontSize="11" color="1E3A8A" bold="true">対象部門</Text>
        <Text fontSize="13" color="1E1B4B" bold="true">全12部門・2,400名</Text>
      </VStack>
    </HStack>
    <HStack gap="6" alignItems="center">
      <Icon name="zap" size="18" color="FFFFFF" variant="circle-filled" bgColor="6D28D9" w="28" h="28" />
      <VStack gap="1">
        <Text fontSize="11" color="4C1D95" bold="true">業務効率化</Text>
        <Text fontSize="13" color="1E1B4B" bold="true">年間40,000時間削減</Text>
      </VStack>
    </HStack>
    <HStack gap="6" alignItems="center">
      <Icon name="shield-check" size="18" color="FFFFFF" variant="circle-filled" bgColor="4F46E5" w="28" h="28" />
      <VStack gap="1">
        <Text fontSize="11" color="3730A3" bold="true">セキュリティ</Text>
        <Text fontSize="13" color="1E1B4B" bold="true">ゼロトラスト完全移行</Text>
      </VStack>
    </HStack>
  </HStack>

  <HStack w="max" justifyContent="spaceBetween" alignItems="center">
    <Text fontSize="9" color="8B8BB0">※本ロードマップは経営戦略会議承認済み（2025年4月改訂版）</Text>
    <Text fontSize="9" color="6D6B99">DX推進本部｜Corporate Digital Transformation Office</Text>
  </HStack>

</VStack>`,
  },
];

export const DEFAULT_TEMPLATE = SAMPLE_TEMPLATES[0];
