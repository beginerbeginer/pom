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
      <Box w="max" padding="12" backgroundColor="0E0D6A" border.color="0E0D6A" border.width="1">
        <Text fontSize="14" color="FFFFFF" textAlign="center" bold="true">主要経営指標（連結）</Text>
      </Box>
      <Table w="max" defaultRowHeight="38">
        <TableColumn width="140" />
        <TableColumn width="110" />
        <TableColumn width="110" />
        <TableColumn width="80" />
        <TableRow>
          <TableCell fontSize="11" color="FFFFFF" bold="true" textAlign="center" backgroundColor="1A1980">項目</TableCell>
          <TableCell fontSize="11" color="FFFFFF" bold="true" textAlign="center" backgroundColor="1A1980">当期実績</TableCell>
          <TableCell fontSize="11" color="FFFFFF" bold="true" textAlign="center" backgroundColor="1A1980">前年同期</TableCell>
          <TableCell fontSize="11" color="FFFFFF" bold="true" textAlign="center" backgroundColor="1A1980">増減率</TableCell>
        </TableRow>
        <TableRow>
          <TableCell fontSize="11" color="0E0D6A" bold="true" backgroundColor="E8EAF6">売上高</TableCell>
          <TableCell fontSize="11" color="1A1A1A" textAlign="right" backgroundColor="FFFFFF">4,285億円</TableCell>
          <TableCell fontSize="11" color="5A5A5A" textAlign="right" backgroundColor="FFFFFF">3,892億円</TableCell>
          <TableCell fontSize="11" color="0D7A3E" bold="true" textAlign="center" backgroundColor="E3F2E8">+10.1%</TableCell>
        </TableRow>
        <TableRow>
          <TableCell fontSize="11" color="0E0D6A" bold="true" backgroundColor="E8EAF6">営業利益</TableCell>
          <TableCell fontSize="11" color="1A1A1A" textAlign="right" backgroundColor="FFFFFF">512億円</TableCell>
          <TableCell fontSize="11" color="5A5A5A" textAlign="right" backgroundColor="FFFFFF">438億円</TableCell>
          <TableCell fontSize="11" color="0D7A3E" bold="true" textAlign="center" backgroundColor="E3F2E8">+16.9%</TableCell>
        </TableRow>
        <TableRow>
          <TableCell fontSize="11" color="0E0D6A" bold="true" backgroundColor="E8EAF6">経常利益</TableCell>
          <TableCell fontSize="11" color="1A1A1A" textAlign="right" backgroundColor="FFFFFF">498億円</TableCell>
          <TableCell fontSize="11" color="5A5A5A" textAlign="right" backgroundColor="FFFFFF">421億円</TableCell>
          <TableCell fontSize="11" color="0D7A3E" bold="true" textAlign="center" backgroundColor="E3F2E8">+18.3%</TableCell>
        </TableRow>
        <TableRow>
          <TableCell fontSize="11" color="0E0D6A" bold="true" backgroundColor="E8EAF6">当期純利益</TableCell>
          <TableCell fontSize="11" color="1A1A1A" textAlign="right" backgroundColor="FFFFFF">328億円</TableCell>
          <TableCell fontSize="11" color="5A5A5A" textAlign="right" backgroundColor="FFFFFF">276億円</TableCell>
          <TableCell fontSize="11" color="0D7A3E" bold="true" textAlign="center" backgroundColor="E3F2E8">+18.8%</TableCell>
        </TableRow>
        <TableRow>
          <TableCell fontSize="11" color="0E0D6A" bold="true" backgroundColor="E8EAF6">営業利益率</TableCell>
          <TableCell fontSize="11" color="1A1A1A" textAlign="right" backgroundColor="FFFFFF">11.9%</TableCell>
          <TableCell fontSize="11" color="5A5A5A" textAlign="right" backgroundColor="FFFFFF">11.3%</TableCell>
          <TableCell fontSize="11" color="0D7A3E" bold="true" textAlign="center" backgroundColor="E3F2E8">+0.6pt</TableCell>
        </TableRow>
      </Table>
      <Box w="max" padding="10" backgroundColor="FFFFFF" border.color="C5CAE9" border.width="1">
        <VStack gap="6">
          <Text fontSize="11" color="0E0D6A" bold="true">【セグメント別売上構成】</Text>
          <HStack gap="8">
            <Box padding="6" backgroundColor="E8EAF6" border.color="0E0D6A" border.width="1">
              <VStack gap="2" alignItems="center">
                <Text fontSize="9" color="0E0D6A">デジタル事業</Text>
                <Text fontSize="11" color="0E0D6A" bold="true">1,842億円</Text>
                <Text fontSize="9" color="5A5A8A">43.0%</Text>
              </VStack>
            </Box>
            <Box padding="6" backgroundColor="FFF8E1" border.color="F9A825" border.width="1">
              <VStack gap="2" alignItems="center">
                <Text fontSize="9" color="E65100">ソリューション</Text>
                <Text fontSize="11" color="E65100" bold="true">1,285億円</Text>
                <Text fontSize="9" color="FF8F00">30.0%</Text>
              </VStack>
            </Box>
            <Box padding="6" backgroundColor="E8F5E9" border.color="2E7D32" border.width="1">
              <VStack gap="2" alignItems="center">
                <Text fontSize="9" color="1B5E20">その他</Text>
                <Text fontSize="11" color="1B5E20" bold="true">1,158億円</Text>
                <Text fontSize="9" color="388E3C">27.0%</Text>
              </VStack>
            </Box>
          </HStack>
        </VStack>
      </Box>
    </VStack>
    <VStack gap="12">
      <Box w="max" padding="12" backgroundColor="0E0D6A" border.color="0E0D6A" border.width="1">
        <Text fontSize="14" color="FFFFFF" textAlign="center" bold="true">前年同期比推移（四半期別）</Text>
      </Box>
      <Box w="max" padding="12" backgroundColor="FFFFFF" border.color="C5CAE9" border.width="1">
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
      </Box>
      <Box w="max" padding="10" backgroundColor="FFFFFF" border.color="C5CAE9" border.width="1">
        <Table w="max" defaultRowHeight="28">
          <TableColumn width="100" />
          <TableColumn width="90" />
          <TableColumn width="90" />
          <TableColumn width="90" />
          <TableColumn width="90" />
          <TableRow>
            <TableCell fontSize="10" color="FFFFFF" bold="true" textAlign="center" backgroundColor="3949AB">指標</TableCell>
            <TableCell fontSize="10" color="FFFFFF" bold="true" textAlign="center" backgroundColor="3949AB">Q1</TableCell>
            <TableCell fontSize="10" color="FFFFFF" bold="true" textAlign="center" backgroundColor="3949AB">Q2</TableCell>
            <TableCell fontSize="10" color="FFFFFF" bold="true" textAlign="center" backgroundColor="3949AB">Q3</TableCell>
            <TableCell fontSize="10" color="FFFFFF" bold="true" textAlign="center" backgroundColor="3949AB">通期予想</TableCell>
          </TableRow>
          <TableRow>
            <TableCell fontSize="10" color="0E0D6A" backgroundColor="E8EAF6">売上高成長率</TableCell>
            <TableCell fontSize="10" color="1A1A1A" textAlign="center" backgroundColor="FFFFFF">+8.2%</TableCell>
            <TableCell fontSize="10" color="1A1A1A" textAlign="center" backgroundColor="FFFFFF">+9.5%</TableCell>
            <TableCell fontSize="10" color="0D7A3E" bold="true" textAlign="center" backgroundColor="E3F2E8">+10.1%</TableCell>
            <TableCell fontSize="10" color="E65100" textAlign="center" backgroundColor="FFF3E0">+9.8%</TableCell>
          </TableRow>
          <TableRow>
            <TableCell fontSize="10" color="0E0D6A" backgroundColor="E8EAF6">営業利益率</TableCell>
            <TableCell fontSize="10" color="1A1A1A" textAlign="center" backgroundColor="FFFFFF">11.7%</TableCell>
            <TableCell fontSize="10" color="1A1A1A" textAlign="center" backgroundColor="FFFFFF">11.8%</TableCell>
            <TableCell fontSize="10" color="0D7A3E" bold="true" textAlign="center" backgroundColor="E3F2E8">11.9%</TableCell>
            <TableCell fontSize="10" color="E65100" textAlign="center" backgroundColor="FFF3E0">12.0%</TableCell>
          </TableRow>
        </Table>
      </Box>
    </VStack>
  </HStack>
  <Box w="max" padding="12" backgroundColor="0E0D6A">
    <Text fontSize="14" color="FFFFFF" textAlign="center" bold="true">第3四半期 主要トピックス</Text>
  </Box>
  <HStack w="max" gap="12">
    <Box padding="10" backgroundColor="FFFFFF" border.color="0E0D6A" border.width="2">
      <VStack gap="6" alignItems="center">
        <Shape w="36" h="36" shapeType="ellipse" fill.color="E8EAF6" fontSize="12" color="0E0D6A">01</Shape>
        <Text fontSize="11" color="0E0D6A" textAlign="center" bold="true">新規事業の収益寄与</Text>
        <Text fontSize="9" color="3C3C3C" textAlign="center">AI・クラウド事業が前年比+42%成長、売上構成比15%に拡大。SaaS型サービスのARR（年間経常収益）が280億円を突破</Text>
      </VStack>
    </Box>
    <Box padding="10" backgroundColor="FFFFFF" border.color="0E0D6A" border.width="2">
      <VStack gap="6" alignItems="center">
        <Shape w="36" h="36" shapeType="ellipse" fill.color="E8EAF6" fontSize="12" color="0E0D6A">02</Shape>
        <Text fontSize="11" color="0E0D6A" textAlign="center" bold="true">コスト最適化の進展</Text>
        <Text fontSize="9" color="3C3C3C" textAlign="center">全社DX推進により販管費率が前年比1.2pt改善。物流拠点統合で年間45億円のコスト削減を実現</Text>
      </VStack>
    </Box>
    <Box padding="10" backgroundColor="FFFFFF" border.color="0E0D6A" border.width="2">
      <VStack gap="6" alignItems="center">
        <Shape w="36" h="36" shapeType="ellipse" fill.color="E8EAF6" fontSize="12" color="0E0D6A">03</Shape>
        <Text fontSize="11" color="0E0D6A" textAlign="center" bold="true">主力製品の成長加速</Text>
        <Text fontSize="9" color="3C3C3C" textAlign="center">フラッグシップ製品「NEXUS Pro」が累計導入社数5,000社突破。大企業向けエンタープライズ版の受注が好調</Text>
      </VStack>
    </Box>
    <Box padding="10" backgroundColor="FFFFFF" border.color="0E0D6A" border.width="2">
      <VStack gap="6" alignItems="center">
        <Shape w="36" h="36" shapeType="ellipse" fill.color="E8EAF6" fontSize="12" color="0E0D6A">04</Shape>
        <Text fontSize="11" color="0E0D6A" textAlign="center" bold="true">海外展開の加速</Text>
        <Text fontSize="9" color="3C3C3C" textAlign="center">ASEAN地域売上が前年比+28%。シンガポール拠点を起点に東南アジア6カ国での事業展開を本格化</Text>
      </VStack>
    </Box>
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
    <Box padding="32" backgroundColor="FFFFFF" borderRadius="16" shadow.type="outer" shadow.opacity="0.1" shadow.blur="10" shadow.angle="90" shadow.offset="4">
      <VStack gap="16" alignItems="start">
        <Shape shapeType="ellipse" w="48" h="48" fill.color="EEF2FF" fontSize="24" color="4F46E5">⚡</Shape>
        <Text fontSize="20" bold="true" color="0F172A">圧倒的なスピード</Text>
        <Text fontSize="14" color="475569" lineHeight="1.4">
          独自のエンジンにより、従来のツールと比較して約5倍の処理速度を実現しました。
        </Text>
      </VStack>
    </Box>

    <Box padding="32" backgroundColor="FFFFFF" borderRadius="16" shadow.type="outer" shadow.opacity="0.1" shadow.blur="10" shadow.angle="90" shadow.offset="4">
      <VStack gap="16" alignItems="start">
        <Shape shapeType="ellipse" w="48" h="48" fill.color="ECFDF5" fontSize="24" color="059669">🔒</Shape>
        <Text fontSize="20" bold="true" color="0F172A">高度なセキュリティ</Text>
        <Text fontSize="14" color="475569" lineHeight="1.4">
          金融機関レベルの暗号化技術を標準搭載。大切なデータを安全に守ります。
        </Text>
      </VStack>
    </Box>

    <Box padding="32" backgroundColor="FFFFFF" borderRadius="16" shadow.type="outer" shadow.opacity="0.1" shadow.blur="10" shadow.angle="90" shadow.offset="4">
      <VStack gap="16" alignItems="start">
        <Shape shapeType="ellipse" w="48" h="48" fill.color="FFFBEB" fontSize="24" color="D97706">📱</Shape>
        <Text fontSize="20" bold="true" color="0F172A">マルチデバイス対応</Text>
        <Text fontSize="14" color="475569" lineHeight="1.4">
          PC、スマートフォン、タブレット。場所を選ばず、いつでもどこでもアクセス可能。
        </Text>
      </VStack>
    </Box>
  </HStack>

  <Box w="max" padding="40" backgroundColor="1E293B" borderRadius="16">
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
  </Box>

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
    <Box w="30%" padding="32" backgroundColor="FFFFFF" borderRadius="32" shadow.type="outer" shadow.opacity="0.05" shadow.blur="20" shadow.offset="10">
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
    </Box>

    <Box w="32%" padding="40" backgroundColor="FFFFFF" borderRadius="32" border.color="6366F1" border.width="3" shadow.type="outer" shadow.opacity="0.15" shadow.blur="30" shadow.offset="15">
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
    </Box>

    <Box w="30%" padding="32" backgroundColor="FFFFFF" borderRadius="32" shadow.type="outer" shadow.opacity="0.05" shadow.blur="20" shadow.offset="10">
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
    </Box>
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
    <Box padding="16" backgroundColor="FFFFFF" border.color="E0E0E0" border.width="1" borderRadius="8">
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
    </Box>
    <Box padding="16" backgroundColor="FFFFFF" border.color="E0E0E0" border.width="1" borderRadius="8">
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
    </Box>
  </HStack>
  <HStack w="max" gap="16">
    <Box padding="16" backgroundColor="FFFFFF" border.color="E0E0E0" border.width="1" borderRadius="8">
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
    </Box>
    <Box padding="16" backgroundColor="FFFFFF" border.color="E0E0E0" border.width="1" borderRadius="8">
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
    </Box>
    <Box padding="16" backgroundColor="FFFFFF" border.color="E0E0E0" border.width="1" borderRadius="8">
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
    </Box>
  </HStack>
  <Box w="max" padding="16" backgroundColor="FFFFFF" border.color="E0E0E0" border.width="1" borderRadius="8">
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
  </Box>
</VStack>`,
  },
];

export const DEFAULT_TEMPLATE = SAMPLE_TEMPLATES[0];
