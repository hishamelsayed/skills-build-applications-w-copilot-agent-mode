const codespaceName = process.env.CODESPACE_NAME?.trim();
export const getApiBaseUrl = () => {
    if (codespaceName) {
        return `https://${codespaceName}-8000.app.github.dev`;
    }
    return 'http://localhost:8000';
};
