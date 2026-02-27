import { palette } from "./palette";

// ============================================================
// Page 6: Chart Test
// テスト対象: chartType, data, showLegend, showTitle, chartColors
// ============================================================
export const page6ChartXml = `
<VStack w="100%" h="max" padding="48" gap="20" alignItems="stretch" backgroundColor="${palette.background}">
  <Text fontPx="28" color="${palette.charcoal}" bold="true">Page 6: Chart Test</Text>
  <HStack gap="16" alignItems="stretch">
    <Box w="50%" padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
      <VStack gap="8">
        <Text fontPx="14" bold="true">Bar Chart</Text>
        <Chart chartType="bar" w="400" h="180" showLegend="true" chartColors='["0088CC","00AA00"]'>
          <Series name="Sales">
            <DataPoint label="Q1" value="100" />
            <DataPoint label="Q2" value="200" />
            <DataPoint label="Q3" value="150" />
            <DataPoint label="Q4" value="300" />
          </Series>
          <Series name="Profit">
            <DataPoint label="Q1" value="30" />
            <DataPoint label="Q2" value="60" />
            <DataPoint label="Q3" value="45" />
            <DataPoint label="Q4" value="90" />
          </Series>
        </Chart>
      </VStack>
    </Box>
    <Box w="50%" padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
      <VStack gap="8">
        <Text fontPx="14" bold="true">Line Chart</Text>
        <Chart chartType="line" w="400" h="180" showLegend="true" chartColors='["${palette.blue}"]'>
          <Series name="Revenue">
            <DataPoint label="Jan" value="50" />
            <DataPoint label="Feb" value="80" />
            <DataPoint label="Mar" value="60" />
            <DataPoint label="Apr" value="120" />
            <DataPoint label="May" value="100" />
            <DataPoint label="Jun" value="150" />
          </Series>
        </Chart>
      </VStack>
    </Box>
  </HStack>
  <HStack gap="16" alignItems="stretch">
    <Box w="50%" padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
      <VStack gap="8">
        <Text fontPx="14" bold="true">Pie Chart (with title)</Text>
        <Chart chartType="pie" w="400" h="180" showLegend="true" showTitle="true" title="Market Share" chartColors='["0088CC","00AA00","FF6600","888888"]'>
          <Series name="Share">
            <DataPoint label="A" value="40" />
            <DataPoint label="B" value="30" />
            <DataPoint label="C" value="20" />
            <DataPoint label="D" value="10" />
          </Series>
        </Chart>
      </VStack>
    </Box>
    <Box w="50%" padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
      <VStack gap="8">
        <Text fontPx="14" bold="true">Bar Chart (with title)</Text>
        <Chart chartType="bar" w="400" h="180" showLegend="true" showTitle="true" title="Regional Sales" chartColors='["${palette.blue}","${palette.accent}"]'>
          <Series name="2023">
            <DataPoint label="N" value="250" />
            <DataPoint label="S" value="180" />
            <DataPoint label="E" value="220" />
            <DataPoint label="W" value="150" />
          </Series>
          <Series name="2024">
            <DataPoint label="N" value="300" />
            <DataPoint label="S" value="200" />
            <DataPoint label="E" value="250" />
            <DataPoint label="W" value="180" />
          </Series>
        </Chart>
      </VStack>
    </Box>
  </HStack>
</VStack>
`;

// ============================================================
// Page 10: Additional Chart Types Test
// テスト対象: area, doughnut, radar
// ============================================================
export const page10ChartAdditionalXml = `
<VStack w="100%" h="max" padding="48" gap="16" alignItems="stretch" backgroundColor="${palette.background}">
  <Text fontPx="28" color="${palette.charcoal}" bold="true">Page 10: Additional Chart Types</Text>
  <HStack gap="16" alignItems="stretch">
    <Box w="33%" padding="12" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
      <VStack gap="8">
        <Text fontPx="14" bold="true">Area Chart</Text>
        <Chart chartType="area" w="350" h="200" showLegend="true" chartColors='["0088CC"]'>
          <Series name="Revenue">
            <DataPoint label="Jan" value="30" />
            <DataPoint label="Feb" value="50" />
            <DataPoint label="Mar" value="40" />
            <DataPoint label="Apr" value="70" />
            <DataPoint label="May" value="60" />
          </Series>
        </Chart>
      </VStack>
    </Box>
    <Box w="33%" padding="12" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
      <VStack gap="8">
        <Text fontPx="14" bold="true">Doughnut Chart</Text>
        <Chart chartType="doughnut" w="350" h="200" showLegend="true" chartColors='["0088CC","00AA00","FF6600","888888"]'>
          <Series name="Share">
            <DataPoint label="A" value="35" />
            <DataPoint label="B" value="25" />
            <DataPoint label="C" value="25" />
            <DataPoint label="D" value="15" />
          </Series>
        </Chart>
      </VStack>
    </Box>
    <Box w="33%" padding="12" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
      <VStack gap="8">
        <Text fontPx="14" bold="true">Radar Chart</Text>
        <Chart chartType="radar" w="350" h="200" showLegend="true" chartColors='["0088CC"]' radarStyle="filled">
          <Series name="Skills">
            <DataPoint label="Tech" value="80" />
            <DataPoint label="Design" value="60" />
            <DataPoint label="PM" value="70" />
            <DataPoint label="Sales" value="50" />
            <DataPoint label="Support" value="90" />
          </Series>
        </Chart>
      </VStack>
    </Box>
  </HStack>
</VStack>
`;
