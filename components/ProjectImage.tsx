import React from 'react';

interface ProjectImageProps {
  title: string;
  tag: string;
  industry: string;
  className?: string;
}

/**
 * Generates a custom SVG dashboard visualization based on project data
 * This creates unique, impactful images for each project without external APIs
 */
const ProjectImage: React.FC<ProjectImageProps> = ({ 
  title, 
  tag, 
  industry, 
  className = "w-full h-full object-cover" 
}) => {
  // Generate unique colors based on tag
  const getColors = (tag: string) => {
    const colorSchemes: Record<string, { primary: string; secondary: string; accent: string }> = {
      'REVENUE GROWTH': {
        primary: '#30D158', // Green
        secondary: '#4CD964',
        accent: '#FFD60A'
      },
      'SALES EFFICIENCY': {
        primary: '#007AFF', // Blue
        secondary: '#5AC8FA',
        accent: '#FF9500'
      },
      'CUSTOMER RETENTION': {
        primary: '#FF3B30', // Red
        secondary: '#FF6B6B',
        accent: '#FFD60A'
      }
    };
    
    return colorSchemes[tag] || {
      primary: '#30D158',
      secondary: '#4CD964',
      accent: '#FFD60A'
    };
  };

  const colors = getColors(tag);
  
  // Generate unique pattern based on title hash
  const titleHash = title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const patternSeed = titleHash % 100;

  return (
    <svg
      viewBox="0 0 1200 800"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      style={{ background: '#0A0A0A' }}
    >
      {/* Grid background */}
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1"/>
        </pattern>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={colors.primary} stopOpacity="0.1" />
          <stop offset="100%" stopColor={colors.secondary} stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={colors.accent} stopOpacity="0.15" />
          <stop offset="100%" stopColor={colors.primary} stopOpacity="0.05" />
        </linearGradient>
      </defs>
      
      <rect width="1200" height="800" fill="#0A0A0A" />
      <rect width="1200" height="800" fill="url(#grid)" />
      <rect width="1200" height="800" fill="url(#gradient1)" />
      
      {/* Dashboard panels */}
      {/* Panel 1 - Top Left */}
      <g transform="translate(40, 40)">
        <rect width="360" height="200" rx="8" fill="rgba(21, 21, 21, 0.8)" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
        <text x="20" y="35" fill={colors.primary} fontSize="14" fontWeight="600" fontFamily="system-ui">Revenue Growth</text>
        <text x="20" y="60" fill="#ffffff" fontSize="32" fontWeight="700" fontFamily="system-ui">+35%</text>
        <text x="20" y="85" fill="rgba(255,255,255,0.5)" fontSize="12" fontFamily="system-ui">vs last quarter</text>
        {/* Chart line */}
        <path
          d={`M 20 140 Q 80 ${120 + (patternSeed % 20)} 140 ${100 + (patternSeed % 30)} T 320 80`}
          fill="none"
          stroke={colors.primary}
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx="320" cy="80" r="4" fill={colors.primary} />
      </g>

      {/* Panel 2 - Top Right */}
      <g transform="translate(420, 40)">
        <rect width="360" height="200" rx="8" fill="rgba(21, 21, 21, 0.8)" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
        <text x="20" y="35" fill={colors.secondary} fontSize="14" fontWeight="600" fontFamily="system-ui">Active Users</text>
        <text x="20" y="60" fill="#ffffff" fontSize="32" fontWeight="700" fontFamily="system-ui">12.4K</text>
        <text x="20" y="85" fill="rgba(255,255,255,0.5)" fontSize="12" fontFamily="system-ui">+18% growth</text>
        {/* Bar chart */}
        <g transform="translate(20, 120)">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <rect
              key={i}
              x={i * 50}
              y={60 - ((patternSeed + i * 7) % 50)}
              width="35"
              height={(patternSeed + i * 7) % 50}
              fill={colors.secondary}
              opacity="0.8"
              rx="2"
            />
          ))}
        </g>
      </g>

      {/* Panel 3 - Bottom Left */}
      <g transform="translate(40, 260)">
        <rect width="360" height="200" rx="8" fill="rgba(21, 21, 21, 0.8)" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
        <text x="20" y="35" fill={colors.accent} fontSize="14" fontWeight="600" fontFamily="system-ui">Conversion Rate</text>
        <text x="20" y="60" fill="#ffffff" fontSize="32" fontWeight="700" fontFamily="system-ui">8.2%</text>
        <text x="20" y="85" fill="rgba(255,255,255,0.5)" fontSize="12" fontFamily="system-ui">Above target</text>
        {/* Pie chart representation */}
        <g transform="translate(180, 140)">
          <circle cx="0" cy="0" r="50" fill="none" stroke={colors.accent} strokeWidth="8" strokeDasharray={`${314 * 0.82} 314`} transform="rotate(-90)" opacity="0.3"/>
          <circle cx="0" cy="0" r="50" fill="none" stroke={colors.accent} strokeWidth="8" strokeDasharray={`${314 * 0.18} 314`} transform="rotate(-90)" strokeDashoffset={-314 * 0.82}/>
        </g>
      </g>

      {/* Panel 4 - Bottom Right */}
      <g transform="translate(420, 260)">
        <rect width="360" height="200" rx="8" fill="rgba(21, 21, 21, 0.8)" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
        <text x="20" y="35" fill={colors.primary} fontSize="14" fontWeight="600" fontFamily="system-ui">MRR</text>
        <text x="20" y="60" fill="#ffffff" fontSize="32" fontWeight="700" fontFamily="system-ui">$124K</text>
        <text x="20" y="85" fill="rgba(255,255,255,0.5)" fontSize="12" fontFamily="system-ui">Monthly recurring</text>
        {/* Area chart */}
        <g transform="translate(20, 120)">
          <path
            d={`M 0 60 L 50 ${50 - (patternSeed % 15)} L 100 ${40 - (patternSeed % 20)} L 150 ${35 - (patternSeed % 25)} L 200 ${30 - (patternSeed % 30)} L 250 ${25 - (patternSeed % 35)} L 300 20 L 300 60 L 0 60 Z`}
            fill={`url(#gradient2)`}
            opacity="0.6"
          />
          <path
            d={`M 0 60 L 50 ${50 - (patternSeed % 15)} L 100 ${40 - (patternSeed % 20)} L 150 ${35 - (patternSeed % 25)} L 200 ${30 - (patternSeed % 30)} L 250 ${25 - (patternSeed % 35)} L 300 20`}
            fill="none"
            stroke={colors.primary}
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>
      </g>

      {/* Central metric highlight */}
      <g transform="translate(800, 300)">
        <rect width="360" height="200" rx="12" fill="rgba(48, 209, 88, 0.1)" stroke={colors.primary} strokeWidth="2" strokeDasharray="4 4" opacity="0.5"/>
        <text x="180" y="100" fill={colors.primary} fontSize="48" fontWeight="700" fontFamily="system-ui" textAnchor="middle" dominantBaseline="middle">
          {tag.split(' ')[0]}
        </text>
        <text x="180" y="140" fill="rgba(255,255,255,0.6)" fontSize="16" fontFamily="system-ui" textAnchor="middle" dominantBaseline="middle">
          {industry}
        </text>
      </g>

      {/* Decorative elements */}
      <circle cx="1100" cy="100" r="3" fill={colors.primary} opacity="0.6">
        <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite"/>
      </circle>
      <circle cx="1150" cy="150" r="2" fill={colors.secondary} opacity="0.4">
        <animate attributeName="opacity" values="0.4;0.8;0.4" dur="3s" repeatCount="indefinite"/>
      </circle>
      <circle cx="1050" cy="700" r="2.5" fill={colors.accent} opacity="0.5">
        <animate attributeName="opacity" values="0.5;1;0.5" dur="2.5s" repeatCount="indefinite"/>
      </circle>
    </svg>
  );
};

export default ProjectImage;
