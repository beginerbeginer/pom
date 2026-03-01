import { palette } from "./palette.js";

// ============================================================
// Page 21: XML Child Element Notation Test
// テスト対象: parseXml の子要素記法（Chart, Table, Timeline, ProcessArrow, Tree）
// ============================================================
export const page21XmlChildElementsXml = `
<VStack gap="8" padding="48" backgroundColor="${palette.background}">
  <Text fontPx="28" bold="true" color="${palette.navy}">XML Child Element Notation</Text>
  <HStack gap="16" alignItems="start">
    <VStack gap="8" w="380">
      <Text fontPx="14" bold="true" color="${palette.charcoal}">Chart (Series/DataPoint)</Text>
      <Chart chartType="bar" w="380" h="140">
        <ChartSeries name="Q1">
          <ChartDataPoint label="Jan" value="100" />
          <ChartDataPoint label="Feb" value="120" />
          <ChartDataPoint label="Mar" value="90" />
        </ChartSeries>
      </Chart>
      <Text fontPx="14" bold="true" color="${palette.charcoal}">Table (Column/Row/Cell)</Text>
      <Table w="380">
        <TableColumn width="190" />
        <TableColumn width="190" />
        <TableRow>
          <TableCell bold="true" backgroundColor="${palette.lightBlue}">Name</TableCell>
          <TableCell bold="true" backgroundColor="${palette.lightBlue}">Score</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Alice</TableCell>
          <TableCell>95</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Bob</TableCell>
          <TableCell>87</TableCell>
        </TableRow>
      </Table>
    </VStack>
    <VStack gap="8" w="380">
      <Text fontPx="14" bold="true" color="${palette.charcoal}">Timeline (TimelineItem)</Text>
      <Timeline direction="horizontal" w="380" h="120">
        <TimelineItem date="2024-01" title="Plan" color="${palette.blue}" />
        <TimelineItem date="2024-04" title="Build" color="${palette.accent}" />
        <TimelineItem date="2024-07" title="Launch" color="${palette.green}" />
      </Timeline>
      <Text fontPx="14" bold="true" color="${palette.charcoal}">ProcessArrow (Step)</Text>
      <ProcessArrow direction="horizontal" w="380" h="60">
        <ProcessArrowStep label="Plan" color="${palette.blue}" />
        <ProcessArrowStep label="Build" color="${palette.accent}" />
        <ProcessArrowStep label="Launch" color="${palette.green}" />
      </ProcessArrow>
      <Text fontPx="14" bold="true" color="${palette.charcoal}">Tree (TreeItem)</Text>
      <Tree layout="vertical" w="380" h="140">
        <TreeItem label="CEO" color="${palette.navy}">
          <TreeItem label="CTO" color="${palette.blue}">
            <TreeItem label="Dev" />
          </TreeItem>
          <TreeItem label="CFO" color="${palette.accent}" />
        </TreeItem>
      </Tree>
    </VStack>
  </HStack>
</VStack>
`;
