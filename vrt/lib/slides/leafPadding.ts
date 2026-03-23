import { palette } from "./palette.js";

// ============================================================
// Page 30: Leaf Node Padding Test
// テスト対象: leaf ノードに padding を設定した場合のコンテンツ描画位置
// ============================================================
export const page30LeafPaddingXml = `
<VStack w="100%" h="max" padding="48" gap="16" alignItems="stretch" backgroundColor="${palette.background}">
  <Text fontSize="28" color="${palette.charcoal}" bold="true">Page 30: Leaf Node Padding</Text>

  <HStack gap="16" alignItems="stretch">
    <!-- Text with padding -->
    <VStack gap="4" w="33%">
      <Text fontSize="12" bold="true">Text padding=20</Text>
      <Text padding="20" backgroundColor="FFFFFF" border.color="${palette.border}" border.width="1" fontSize="14">
        Padded text content
      </Text>
    </VStack>

    <!-- Ul with padding -->
    <VStack gap="4" w="33%">
      <Text fontSize="12" bold="true">Ul padding=20</Text>
      <Ul padding="20" backgroundColor="FFFFFF" border.color="${palette.border}" border.width="1" fontSize="14">
        <Li>Item A</Li>
        <Li>Item B</Li>
      </Ul>
    </VStack>

    <!-- Ol with padding -->
    <VStack gap="4" w="33%">
      <Text fontSize="12" bold="true">Ol padding=20</Text>
      <Ol padding="20" backgroundColor="FFFFFF" border.color="${palette.border}" border.width="1" fontSize="14">
        <Li>First</Li>
        <Li>Second</Li>
      </Ol>
    </VStack>
  </HStack>

  <HStack gap="16" alignItems="stretch">
    <!-- Image with padding -->
    <VStack gap="4" w="33%">
      <Text fontSize="12" bold="true">Image padding=20</Text>
      <Image padding="20" w="200" h="120" backgroundColor="FFFFFF" border.color="${palette.border}" border.width="1" src="https://placehold.co/160x80/png" />
    </VStack>

    <!-- Shape with padding -->
    <VStack gap="4" w="33%">
      <Text fontSize="12" bold="true">Shape padding=20</Text>
      <Shape padding="20" w="200" h="120" backgroundColor="FFFFFF" border.color="${palette.border}" border.width="1" shapeType="roundRect" fill.color="${palette.blue}" text="Shape" color="FFFFFF" fontSize="14" />
    </VStack>

    <!-- Icon with padding -->
    <VStack gap="4" w="33%">
      <Text fontSize="12" bold="true">Icon padding=20</Text>
      <Icon padding="20" backgroundColor="FFFFFF" border.color="${palette.border}" border.width="1" name="star" size="32" color="#${palette.blue}" />
    </VStack>
  </HStack>

  <HStack gap="16" alignItems="stretch">
    <!-- Chart with padding -->
    <VStack gap="4" w="50%">
      <Text fontSize="12" bold="true">Chart padding=20</Text>
      <Chart padding="20" w="350" h="180" backgroundColor="FFFFFF" border.color="${palette.border}" border.width="1" chartType="bar">
        <ChartSeries name="Sales">
          <ChartDataPoint label="Q1" value="10" />
          <ChartDataPoint label="Q2" value="20" />
          <ChartDataPoint label="Q3" value="30" />
        </ChartSeries>
      </Chart>
    </VStack>

    <!-- Table with padding -->
    <VStack gap="4" w="50%">
      <Text fontSize="12" bold="true">Table padding=20</Text>
      <Table padding="20" w="350" h="180" backgroundColor="FFFFFF" border.color="${palette.border}" border.width="1">
        <TableColumn width="150" />
        <TableColumn width="150" />
        <TableRow>
          <TableCell fontSize="14" bold="true">A1</TableCell>
          <TableCell fontSize="14" bold="true">B1</TableCell>
        </TableRow>
        <TableRow>
          <TableCell fontSize="14">A2</TableCell>
          <TableCell fontSize="14">B2</TableCell>
        </TableRow>
      </Table>
    </VStack>
  </HStack>
</VStack>
`;

// ============================================================
// Page 31: Leaf Node Padding - Composite Nodes & Asymmetric Padding
// テスト対象: composite ノードの padding、非対称 padding
// ============================================================
export const page31LeafPaddingCompositeXml = `
<VStack w="100%" h="max" padding="48" gap="16" alignItems="stretch" backgroundColor="${palette.background}">
  <Text fontSize="28" color="${palette.charcoal}" bold="true">Page 31: Composite & Asymmetric Padding</Text>

  <HStack gap="16" alignItems="stretch">
    <!-- Timeline with padding -->
    <VStack gap="4" w="50%">
      <Text fontSize="12" bold="true">Timeline padding=20</Text>
      <Timeline padding="20" direction="horizontal" w="550" h="120" backgroundColor="FFFFFF" border.color="${palette.border}" border.width="1">
        <TimelineItem date="Q1" title="Plan" color="${palette.blue}" />
        <TimelineItem date="Q2" title="Dev" color="${palette.accent}" />
        <TimelineItem date="Q3" title="Ship" color="${palette.green}" />
      </Timeline>
    </VStack>

    <!-- ProcessArrow with padding -->
    <VStack gap="4" w="50%">
      <Text fontSize="12" bold="true">ProcessArrow padding=20</Text>
      <ProcessArrow padding="20" direction="horizontal" w="550" h="80" backgroundColor="FFFFFF" border.color="${palette.border}" border.width="1">
        <ProcessArrowStep label="Input" />
        <ProcessArrowStep label="Process" />
        <ProcessArrowStep label="Output" />
      </ProcessArrow>
    </VStack>
  </HStack>

  <HStack gap="16" alignItems="stretch">
    <!-- Flow with padding -->
    <VStack gap="4" w="50%">
      <Text fontSize="12" bold="true">Flow padding=20</Text>
      <Flow padding="20" direction="horizontal" w="550" h="120" backgroundColor="FFFFFF" border.color="${palette.border}" border.width="1">
        <FlowNode id="a" shape="flowChartProcess" text="A" />
        <FlowNode id="b" shape="flowChartProcess" text="B" />
        <FlowNode id="c" shape="flowChartProcess" text="C" />
        <FlowConnection from="a" to="b" />
        <FlowConnection from="b" to="c" />
      </Flow>
    </VStack>

    <!-- Pyramid with padding -->
    <VStack gap="4" w="50%">
      <Text fontSize="12" bold="true">Pyramid padding=20</Text>
      <Pyramid padding="20" w="400" h="150" backgroundColor="FFFFFF" border.color="${palette.border}" border.width="1">
        <PyramidLevel label="Top" color="#4472C4" />
        <PyramidLevel label="Middle" color="#5B9BD5" />
        <PyramidLevel label="Base" color="#70AD47" />
      </Pyramid>
    </VStack>
  </HStack>

  <HStack gap="16" alignItems="stretch">
    <!-- Tree with padding -->
    <VStack gap="4" w="50%">
      <Text fontSize="12" bold="true">Tree padding=20</Text>
      <Tree padding="20" w="400" h="180" backgroundColor="FFFFFF" border.color="${palette.border}" border.width="1" data='{"label":"Root","children":[{"label":"A"},{"label":"B"}]}' />
    </VStack>

    <!-- Matrix with padding -->
    <VStack gap="4" w="50%">
      <Text fontSize="12" bold="true">Matrix padding=20</Text>
      <Matrix padding="20" w="400" h="180" backgroundColor="FFFFFF" border.color="${palette.border}" border.width="1">
        <MatrixAxes x="Cost" y="Value" />
        <MatrixItem label="P1" x="0.3" y="0.7" color="${palette.blue}" />
        <MatrixItem label="P2" x="0.7" y="0.4" color="${palette.red}" />
      </Matrix>
    </VStack>
  </HStack>

  <!-- Asymmetric padding test -->
  <HStack gap="16" alignItems="stretch">
    <VStack gap="4" w="33%">
      <Text fontSize="12" bold="true">Text asymmetric</Text>
      <Text padding='{"top":10,"right":40,"bottom":30,"left":20}' backgroundColor="FFFFFF" border.color="${palette.border}" border.width="1" fontSize="14">
        Asymmetric padding
      </Text>
    </VStack>

    <VStack gap="4" w="33%">
      <Text fontSize="12" bold="true">Icon variant + padding</Text>
      <Icon padding="20" variant="circle-filled" bgColor="#${palette.blue}" backgroundColor="FFFFFF" border.color="${palette.border}" border.width="1" name="star" size="24" color="#FFFFFF" />
    </VStack>

    <VStack gap="4" w="33%">
      <Text fontSize="12" bold="true">Shape asymmetric</Text>
      <Shape padding='{"top":10,"right":40,"bottom":30,"left":20}' w="200" h="120" backgroundColor="FFFFFF" border.color="${palette.border}" border.width="1" shapeType="rect" fill.color="${palette.green}" text="Asym" color="FFFFFF" fontSize="14" />
    </VStack>
  </HStack>
</VStack>
`;
