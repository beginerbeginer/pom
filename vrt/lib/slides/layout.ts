import { palette } from "./palette";

// ============================================================
// Page 7: Layout Test (VStack / HStack / Box)
// テスト対象: gap, alignItems, justifyContent
// ============================================================
export const page7LayoutXml = `
<VStack w="100%" h="max" padding="48" gap="20" alignItems="stretch" backgroundColor="${palette.background}">
  <Text fontPx="28" color="${palette.charcoal}" bold="true">Page 7: Layout Test</Text>
  <Box padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
    <VStack gap="12">
      <Text fontPx="14" bold="true">HStack gap:</Text>
      <HStack gap="8" alignItems="stretch">
        <Box padding="8" backgroundColor="${palette.lightBlue}">
          <HStack gap="8">
            <Box w="40" h="30" backgroundColor="${palette.blue}"><Text text=""></Text></Box>
            <Box w="40" h="30" backgroundColor="${palette.blue}"><Text text=""></Text></Box>
            <Box w="40" h="30" backgroundColor="${palette.blue}"><Text text=""></Text></Box>
          </HStack>
        </Box>
        <Text fontPx="12">gap: 8</Text>
        <Box padding="8" backgroundColor="${palette.lightBlue}">
          <HStack gap="32">
            <Box w="40" h="30" backgroundColor="${palette.blue}"><Text text=""></Text></Box>
            <Box w="40" h="30" backgroundColor="${palette.blue}"><Text text=""></Text></Box>
            <Box w="40" h="30" backgroundColor="${palette.blue}"><Text text=""></Text></Box>
          </HStack>
        </Box>
        <Text fontPx="12">gap: 32</Text>
      </HStack>
    </VStack>
  </Box>
  <Box padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
    <VStack gap="12">
      <Text fontPx="14" bold="true">HStack alignItems:</Text>
      <HStack gap="16" alignItems="stretch">
        <VStack gap="4" alignItems="center">
          <Box w="120" h="60" padding="4" backgroundColor="${palette.lightBlue}">
            <HStack gap="4" alignItems="start">
              <Box w="30" h="20" backgroundColor="${palette.blue}"><Text text=""></Text></Box>
              <Box w="30" h="40" backgroundColor="${palette.blue}"><Text text=""></Text></Box>
            </HStack>
          </Box>
          <Text fontPx="12">start</Text>
        </VStack>
        <VStack gap="4" alignItems="center">
          <Box w="120" h="60" padding="4" backgroundColor="${palette.lightBlue}">
            <HStack gap="4" alignItems="center">
              <Box w="30" h="20" backgroundColor="${palette.blue}"><Text text=""></Text></Box>
              <Box w="30" h="40" backgroundColor="${palette.blue}"><Text text=""></Text></Box>
            </HStack>
          </Box>
          <Text fontPx="12">center</Text>
        </VStack>
        <VStack gap="4" alignItems="center">
          <Box w="120" h="60" padding="4" backgroundColor="${palette.lightBlue}">
            <HStack gap="4" alignItems="end">
              <Box w="30" h="20" backgroundColor="${palette.blue}"><Text text=""></Text></Box>
              <Box w="30" h="40" backgroundColor="${palette.blue}"><Text text=""></Text></Box>
            </HStack>
          </Box>
          <Text fontPx="12">end</Text>
        </VStack>
        <VStack gap="4" alignItems="center">
          <Box w="120" h="60" padding="4" backgroundColor="${palette.lightBlue}">
            <HStack gap="4" alignItems="stretch">
              <Box w="30" backgroundColor="${palette.blue}"><Text text=""></Text></Box>
              <Box w="30" backgroundColor="${palette.blue}"><Text text=""></Text></Box>
            </HStack>
          </Box>
          <Text fontPx="12">stretch</Text>
        </VStack>
      </HStack>
    </VStack>
  </Box>
  <Box padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
    <VStack gap="12">
      <Text fontPx="14" bold="true">HStack justifyContent:</Text>
      <HStack gap="16" alignItems="stretch">
        <VStack gap="4" alignItems="center">
          <Box w="140" h="40" padding="4" backgroundColor="${palette.lightBlue}">
            <HStack gap="4" justifyContent="start">
              <Box w="30" h="30" backgroundColor="${palette.blue}"><Text text=""></Text></Box>
              <Box w="30" h="30" backgroundColor="${palette.blue}"><Text text=""></Text></Box>
            </HStack>
          </Box>
          <Text fontPx="12">start</Text>
        </VStack>
        <VStack gap="4" alignItems="center">
          <Box w="140" h="40" padding="4" backgroundColor="${palette.lightBlue}">
            <HStack gap="4" justifyContent="center">
              <Box w="30" h="30" backgroundColor="${palette.blue}"><Text text=""></Text></Box>
              <Box w="30" h="30" backgroundColor="${palette.blue}"><Text text=""></Text></Box>
            </HStack>
          </Box>
          <Text fontPx="12">center</Text>
        </VStack>
        <VStack gap="4" alignItems="center">
          <Box w="140" h="40" padding="4" backgroundColor="${palette.lightBlue}">
            <HStack gap="4" justifyContent="end">
              <Box w="30" h="30" backgroundColor="${palette.blue}"><Text text=""></Text></Box>
              <Box w="30" h="30" backgroundColor="${palette.blue}"><Text text=""></Text></Box>
            </HStack>
          </Box>
          <Text fontPx="12">end</Text>
        </VStack>
        <VStack gap="4" alignItems="center">
          <Box w="140" h="40" padding="4" backgroundColor="${palette.lightBlue}">
            <HStack justifyContent="spaceBetween">
              <Box w="30" h="30" backgroundColor="${palette.blue}"><Text text=""></Text></Box>
              <Box w="30" h="30" backgroundColor="${palette.blue}"><Text text=""></Text></Box>
            </HStack>
          </Box>
          <Text fontPx="12">spaceBetween</Text>
        </VStack>
      </HStack>
    </VStack>
  </Box>
</VStack>
`;

// ============================================================
// Page 16: Layer Node Test
// テスト対象: LayerNode - 絶対配置、子要素のオーバーラップ、layer in VStack
// ============================================================
export const page16LayerXml = `
<VStack w="100%" h="max" padding="48" gap="20" alignItems="stretch" backgroundColor="${palette.background}">
  <Text fontPx="28" color="${palette.charcoal}" bold="true">Page 16: Layer Node Test</Text>
  <!-- 基本的な絶対配置（重なり合う図形） -->
  <HStack gap="16" alignItems="stretch">
    <Box w="50%" padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
      <VStack gap="12">
        <Text fontPx="14" bold="true">Overlapping Shapes:</Text>
        <Layer w="500" h="200" backgroundColor="F0F4F8">
          <Shape shapeType="rect" w="120" h="100" x="30" y="30" fill='{"color":"${palette.blue}"}' color="FFFFFF" fontPx="14">Back</Shape>
          <Shape shapeType="rect" w="120" h="100" x="80" y="60" fill='{"color":"${palette.red}"}' color="FFFFFF" fontPx="14">Front</Shape>
          <Text x="220" y="80" fontPx="12" color="${palette.charcoal}">Shapes overlap (red is on top)</Text>
        </Layer>
      </VStack>
    </Box>
    <Box w="50%" padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
      <VStack gap="12">
        <Text fontPx="14" bold="true">VStack inside Layer:</Text>
        <Layer w="500" h="200" backgroundColor="F0F4F8">
          <VStack x="20" y="20" w="180" gap="8" padding="12" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
            <Text fontPx="12" bold="true">Left VStack</Text>
            <Text fontPx="11">Item 1</Text>
            <Text fontPx="11">Item 2</Text>
          </VStack>
          <VStack x="260" y="20" w="180" gap="8" padding="12" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
            <Text fontPx="12" bold="true">Right VStack</Text>
            <Text fontPx="11">Item A</Text>
            <Text fontPx="11">Item B</Text>
          </VStack>
        </Layer>
      </VStack>
    </Box>
  </HStack>
  <!-- Line ノードとの組み合わせ -->
  <Box padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
    <VStack gap="12">
      <Text fontPx="14" bold="true">Layer with Line (connection diagram):</Text>
      <Layer w="1100" h="200" backgroundColor="F8FAFC">
        <!-- 左のボックス -->
        <Shape shapeType="roundRect" w="150" h="80" x="50" y="60" fill='{"color":"${palette.blue}"}' color="FFFFFF" fontPx="14">Service A</Shape>
        <!-- 中央のボックス -->
        <Shape shapeType="roundRect" w="150" h="80" x="350" y="60" fill='{"color":"${palette.green}"}' color="FFFFFF" fontPx="14">Service B</Shape>
        <!-- 右のボックス -->
        <Shape shapeType="roundRect" w="150" h="80" x="650" y="60" fill='{"color":"${palette.accent}"}' color="FFFFFF" fontPx="14">Service C</Shape>
        <!-- 接続線 -->
        <Line x1="200" y1="100" x2="350" y2="100" color="333333" lineWidth="2" endArrow="true" />
        <Line x1="500" y1="100" x2="650" y2="100" color="333333" lineWidth="2" endArrow="true" />
        <!-- ラベル -->
        <Text x="240" y="70" fontPx="10" color="${palette.charcoal}">API Call</Text>
        <Text x="550" y="70" fontPx="10" color="${palette.charcoal}">Event</Text>
      </Layer>
    </VStack>
  </Box>
  <!-- ネストした layer -->
  <Box padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
    <VStack gap="12">
      <Text fontPx="14" bold="true">Nested Layer:</Text>
      <Layer w="600" h="150" backgroundColor="E3F2FD">
        <Text x="10" y="10" fontPx="12" bold="true">Outer Layer</Text>
        <Layer x="50" y="40" w="200" h="80" backgroundColor="FFF3E0">
          <Text x="10" y="30" fontPx="11">Inner Layer 1</Text>
        </Layer>
        <Layer x="280" y="40" w="200" h="80" backgroundColor="E8F5E9">
          <Text x="10" y="30" fontPx="11">Inner Layer 2</Text>
        </Layer>
      </Layer>
    </VStack>
  </Box>
</VStack>
`;

// ===================== Page 17: HStack + Table 幅計算 =====================
export const page17HStackTableXml = `
<VStack gap="16" padding="48">
  <Text fontPx="22" bold="true">17. HStack + Table Width Calculation</Text>
  <!-- テーブルが固有サイズを保持するケース -->
  <Box padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
    <VStack gap="12">
      <Text fontPx="14" bold="true">HStack with table (table should keep intrinsic width):</Text>
      <HStack gap="16">
        <Text fontPx="14">Left text</Text>
        <Table defaultRowHeight="28">
          <Column width="80" />
          <Column width="120" />
          <Column width="80" />
          <Row>
            <Cell fontPx="12" bold="true" backgroundColor="${palette.lightBlue}">A</Cell>
            <Cell fontPx="12" bold="true" backgroundColor="${palette.lightBlue}">B</Cell>
            <Cell fontPx="12" bold="true" backgroundColor="${palette.lightBlue}">C</Cell>
          </Row>
          <Row>
            <Cell fontPx="12">1</Cell>
            <Cell fontPx="12">Data</Cell>
            <Cell fontPx="12">OK</Cell>
          </Row>
        </Table>
        <Text fontPx="14">Right text</Text>
      </HStack>
    </VStack>
  </Box>
</VStack>
`;
