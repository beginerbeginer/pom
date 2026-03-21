import { palette } from "./palette.js";

// ============================================================
// Page 9: Timeline Test
// テスト対象: direction (horizontal/vertical), items, color
// ============================================================
export const page9TimelineXml = `
<VStack w="100%" h="max" padding="48" gap="20" alignItems="stretch" backgroundColor="${palette.background}">
  <Text fontSize="28" color="${palette.charcoal}" bold="true">Page 9: Timeline Test</Text>
  <Box padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
    <VStack gap="12">
      <Text fontSize="14" bold="true">Horizontal Timeline (Roadmap):</Text>
      <Timeline direction="horizontal" w="1100" h="120">
        <TimelineItem date="2025/Q1" title="Phase 1" description="基盤構築" color="4CAF50" />
        <TimelineItem date="2025/Q2" title="Phase 2" description="機能開発" color="2196F3" />
        <TimelineItem date="2025/Q3" title="Phase 3" description="テスト" color="FF9800" />
        <TimelineItem date="2025/Q4" title="Phase 4" description="リリース" color="E91E63" />
      </Timeline>
    </VStack>
  </Box>
  <HStack gap="16" alignItems="stretch">
    <Box w="50%" padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
      <VStack gap="12">
        <Text fontSize="14" bold="true">Vertical Timeline (Project Plan):</Text>
        <Timeline direction="vertical" w="500" h="300">
          <TimelineItem date="Week 1" title="Planning" description="要件定義・設計" color="${palette.blue}" />
          <TimelineItem date="Week 2-3" title="Development" description="実装・レビュー" color="${palette.accent}" />
          <TimelineItem date="Week 4" title="Release" description="デプロイ・監視" color="${palette.green}" />
        </Timeline>
      </VStack>
    </Box>
    <Box w="50%" padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
      <VStack gap="12">
        <Text fontSize="14" bold="true">Milestones (Default color):</Text>
        <Timeline direction="vertical" w="500" h="300">
          <TimelineItem date="Jan" title="Kickoff" />
          <TimelineItem date="Mar" title="MVP Launch" />
          <TimelineItem date="Jun" title="GA Release" />
          <TimelineItem date="Dec" title="v2.0" />
        </Timeline>
      </VStack>
    </Box>
  </HStack>
</VStack>
`;
