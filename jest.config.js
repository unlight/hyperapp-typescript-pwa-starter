module.exports = {
    'testEnvironment': 'jsdom',
    'transform': {
        '^.+\\.tsx?$': '<rootDir>/node_modules/ts-jest/preprocessor.js'
    },
    'collectCoverage': false,
    'coverageDirectory': '.testresults',
    'coverageReporters': [
        'lcov',
        'text',
    ],
    'collectCoverageFrom': [
        'src/**/*.ts',
        'src/**/*.tsx',
        '!src/**/*.spec.ts',
        '!src/**/*.spec.tsx',
    ],
    'testMatch': [
        '<rootDir>/src/**/*.spec.ts',
        '<rootDir>/src/**/*.spec.tsx',
    ],
    'moduleFileExtensions': [
        'ts',
        'tsx',
        'js',
    ]
};
