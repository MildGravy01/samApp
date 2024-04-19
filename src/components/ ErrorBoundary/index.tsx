import React, {ErrorInfo, ReactNode} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {hasError: false, error: null};
  }

  static getDerivedStateFromError(error: Error): State {
    // Обновляет состояние так, чтобы следующий рендер показал запасной UI.
    return {hasError: true, error};
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Здесь вы можете добавить логирование ошибки в сервис отчетов, например, Sentry
    console.log('Error caught by Error Boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError && this.state.error) {
      // Вы можете рендерить любой запасной UI
      return (
        <View style={styles.container}>
          <Text>Что-то пошло не так.</Text>
          <Text>{this.state.error.toString()}</Text>
          <Button
            title="Попробуйте снова"
            onPress={() => this.setState({hasError: false, error: null})}
          />
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ErrorBoundary;
