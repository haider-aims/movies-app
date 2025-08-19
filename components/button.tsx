import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  View,
  TouchableOpacityProps,
} from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent' | 'dark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'accent',
  size = 'md',
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className,
  onPress,
  ...props
}) => {
  const getButtonStyles = () => {
    let baseStyles = "rounded-xl items-center justify-center flex-row";
    
    // Size styles
    switch (size) {
      case 'sm':
        baseStyles += " px-3 py-2 min-h-[32px]";
        break;
      case 'md':
        baseStyles += " px-4 py-3 min-h-[44px]";
        break;
      case 'lg':
        baseStyles += " px-6 py-4 min-h-[52px]";
        break;
      case 'xl':
        baseStyles += " px-8 py-5 min-h-[60px]";
        break;
    }
    
    // Width styles
    if (fullWidth) {
      baseStyles += " w-full";
    }
    
    // Variant styles
    if (disabled) {
      baseStyles += " opacity-50";
    } else {
      switch (variant) {
        case 'primary':
          baseStyles += " bg-primary active:bg-primary/80";
          break;
        case 'secondary':
          baseStyles += " bg-secondary active:bg-secondary/80";
          break;
        case 'accent':
          baseStyles += " bg-accent active:bg-accent/80";
          break;
        case 'dark':
          baseStyles += " bg-dark-100 active:bg-dark-200";
          break;
        case 'outline':
          baseStyles += " bg-transparent border-2 border-accent active:bg-accent/10";
          break;
        case 'ghost':
          baseStyles += " bg-transparent active:bg-light-100/20";
          break;
      }
    }
    
    return baseStyles;
  };

  const getTextStyles = () => {
    let textStyles = "font-semibold";
    
    // Size-based text styles
    switch (size) {
      case 'sm':
        textStyles += " text-sm";
        break;
      case 'md':
        textStyles += " text-base";
        break;
      case 'lg':
        textStyles += " text-lg";
        break;
      case 'xl':
        textStyles += " text-xl";
        break;
    }
    
    // Variant-based text colors
    switch (variant) {
      case 'primary':
        textStyles += " text-light-100";
        break;
      case 'secondary':
        textStyles += " text-light-100";
        break;
      case 'accent':
        textStyles += " text-white";
        break;
      case 'dark':
        textStyles += " text-light-100";
        break;
      case 'outline':
        textStyles += " text-accent";
        break;
      case 'ghost':
        textStyles += " text-primary";
        break;
    }
    
    return textStyles;
  };

  const getLoadingColor = () => {
    switch (variant) {
      case 'outline':
      case 'ghost':
        return '#AB8BFF'; // accent color
      default:
        return '#D6C7FF'; // light-100
    }
  };

  return (
    <TouchableOpacity
      className={`${getButtonStyles()} ${className || ''}`}
      onPress={loading || disabled ? undefined : onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          size={size === 'sm' ? 'small' : 'small'}
          color={getLoadingColor()}
        />
      ) : (
        <View className="flex-row items-center justify-center">
          {leftIcon && (
            <View className="mr-2">
              {leftIcon}
            </View>
          )}
          
          <Text className={getTextStyles()}>
            {title}
          </Text>
          
          {rightIcon && (
            <View className="ml-2">
              {rightIcon}
            </View>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

// Icon Button Component (for buttons with only icons)
export const IconButton: React.FC<{
  icon: React.ReactNode;
  variant?: ButtonProps['variant'];
  size?: ButtonProps['size'];
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  onPress?: () => void;
}> = ({
  icon,
  variant = 'ghost',
  size = 'md',
  disabled = false,
  loading = false,
  className,
  onPress,
}) => {
  const getIconButtonStyles = () => {
    let baseStyles = "rounded-full items-center justify-center";
    
    // Size styles
    switch (size) {
      case 'sm':
        baseStyles += " w-8 h-8";
        break;
      case 'md':
        baseStyles += " w-11 h-11";
        break;
      case 'lg':
        baseStyles += " w-14 h-14";
        break;
      case 'xl':
        baseStyles += " w-16 h-16";
        break;
    }
    
    // Variant styles
    if (disabled || loading) {
      baseStyles += " opacity-50";
    } else {
      switch (variant) {
        case 'primary':
          baseStyles += " bg-primary active:bg-primary/80";
          break;
        case 'secondary':
          baseStyles += " bg-secondary active:bg-secondary/80";
          break;
        case 'accent':
          baseStyles += " bg-accent active:bg-accent/80";
          break;
        case 'dark':
          baseStyles += " bg-dark-100 active:bg-dark-200";
          break;
        case 'outline':
          baseStyles += " bg-transparent border-2 border-accent active:bg-accent/10";
          break;
        case 'ghost':
          baseStyles += " bg-transparent active:bg-light-100/20";
          break;
      }
    }
    
    return baseStyles;
  };

  return (
    <TouchableOpacity
      className={`${getIconButtonStyles()} ${className || ''}`}
      onPress={loading || disabled ? undefined : onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'outline' || variant === 'ghost' ? '#AB8BFF' : '#D6C7FF'}
        />
      ) : (
        icon
      )}
    </TouchableOpacity>
  );
};
